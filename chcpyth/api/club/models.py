from django.db import models
from django.core.exceptions import ValidationError

from core.models import BaseModel, Address
from helpers.constants import (
    STATUS_CHOICES, SPORT_CHOICES, BILLING_STATUS_CHOICES, TIME_UNIT_CHOICES, PRIVACY_CHOICES,
    MEMBERSHIP_REQUEST_STATUS_CHOICES, MEMBERSHIP_REQUEST_TYPE_CHOICES, CLUB_ADMIN
)

class Club(BaseModel):
    """ This is the Club entity.

    Attributes:
      id (AutoField): The auto increment ID of club.

      name (CharField): Name of club.
      description (CharField): This field describes the club.
      url (CharField): A customized URL pointing to the profile page of club. This is optional.
      status (CharField): Indicates the status of club. Possible values are:
        A - Active, I - Inactive.

      email (EmailField): The email address.
      primary_phone_number (CharField): The primary phone number to contact.
      secondary_phone_number (CharField): The secondary phone number. This is optional.
      fax_number (CharField): The fax number. This is optional.

      address (ForeignKey): This is a foreign key field, it references the 'core.Address' model.
    """
    id = models.AutoField(primary_key=True)

    name = models.CharField(max_length=100)
    url = models.CharField(max_length=255, unique=True)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES)

    email = models.EmailField(max_length=255)
    primary_phone = models.CharField(max_length=20)
    secondary_phone = models.CharField(max_length=20, blank=True)
    fax_number = models.CharField(max_length=20, blank=True)

    address = models.ForeignKey("core.Address")
    description = models.TextField(help_text='This can store rich text for a completed description of the club')

    def save(self, *args, **kwargs):
        # Save address before saving club.
        if not self.address:
            raise ValidationError("Club address is missing.")

        self.address.save()
        self.address_id = self.address.id

        super(Club, self).save(*args, **kwargs)

    def get_members(self):
        """ This function gets all members of the club.
        """
        from member.models import Membership

        memberships = Membership.objects.filter(club=self)

        return map(lambda membership: membership.member, memberships)

    def has_member(self, member):
        """ This function checks whether the member has membership with the club.
        """
        club_members = self.get_members()

        for club_member in club_members:
            if club_member.ref == member.ref:
                return True

        return False

    def has_admin(self, member):
        """ This function checks whether the member has admin membership with the club.
        """
        from member.models import Membership

        memberships = Membership.objects.filter(club=self)

        for membership in memberships:
            if membership.member.ref == member.ref:
                if membership.role == CLUB_ADMIN:
                    return True
                else:
                    return False

        return False

    def get_subscriptions(self):
        """ This function returns all subscriptions of a club.
        """
        return Subscription.objects.filter(club=self)

    def get_facilities(self):
        """ This function returns all facilities of a club.
        """
        return Facility.objects.filter(club=self)

    def get_general_rules(self):
        """ This function returns all general rules of a club.
        """
        return GeneralRule.objects.filter(club=self)

    def get_sport_rules(self):
        """ This function returns all sport rules of a club.
        """
        return SportRule.objects.filter(club=self)

    def get_events(self):
        """ This function returns all events of a club.
        """
        return Event.objects.filter(club=self)

    def get_bills(self):
        """ This function returns all bills of a club.
        """
        return Bill.objects.filter(club=self)

    def get_membership_requests(self):
        """ This function returns all membership requests of a club.
        """
        return MembershipRequest.objects.filter(club=self)

    def get_club_rates(self):
        """ This function returns all rates of a club.
        """
        return ClubRate.objects.filter(club=self)


class Subscription(BaseModel):
    """ This is the subscription of a club.

    A Club subscribes a SubscriptionPlan in the 'core' module.

    Attributes:
      id (AutoField): The auto increment ID of subscription.

      club (ForeignKey): This field references the Club model.
      plan (ForeignKey): This field references the 'core.Subscription' model.

      expire_date (DateField): The termination date of current subscription.
      status (CharField): The status of subscription. Possible values are:
        A - Active, I - Inactive.
    """
    id = models.AutoField(primary_key=True)

    club = models.ForeignKey("Club")
    plan = models.ForeignKey("core.SubscriptionPlan")

    expire_date = models.DateField()
    status = models.CharField(max_length=1, choices=STATUS_CHOICES)

    class Meta:
        unique_together = (("club", "plan", "expire_date"),)


class Facility(BaseModel):
    """ This is a club facility.

    Attributes:
      id (AutoField): The auto increment ID of facility.

      club (ForeignKey): This field references the Club model, indicating to which club the
        facility belongs.

      name (CharField): The name of facility.
      description (CharField): The description of facility. This could be optional.
      sport_type (CharField): The sport type of facility. Possible values are:
        T - tennis, G - ping pong, D - paddle, B - badminton, S - squash, F5 - football-5 ...
      status (CharField): The status of facility. Possible values are: A - Active, I - Inactive.
    """
    id = models.AutoField(primary_key=True)

    club = models.ForeignKey("Club")

    name = models.CharField(max_length=50)
    sport_type = models.CharField(max_length=3, choices=SPORT_CHOICES)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES)
    description = models.TextField(blank=True)

    class Meta:
        unique_together = (("club", "name"),)

    def get_facility_rules(self):
        """ This function returns all particular rules of a facility.
        """
        return FacilityRule.objects.filter(facility=self)

    def get_facility_rates(self):
        """ This function returns the particular rate of a facility.
        """
        return FacilityRate.objects.filter(facility=self)


class GeneralRule(BaseModel):
    """ This is the a general booking rule of a Club.

    A general booking rule applies on all facilities of a club.

    Attributes:
      id (AutoField): The auto increment ID field.

      club (ForeignKey): This field references the Club model, indicating to which club the
        rule belongs.

      name (CharField): The name of rule.
      value (CharField): The content of booking rule. This field is optional.
    """
    id = models.AutoField(primary_key=True)

    club = models.ForeignKey("Club")

    name = models.CharField(max_length=10)
    value = models.CharField(max_length=20, blank=True)

    class Meta:
        unique_together = (("club", "name"),)


class SportRule(BaseModel):
    """ This is the a booking rule of a particular sport of the Club.

    A sport booking rule only applies on a particular type of facilities of the club. It
    will override the general rule.

    Attributes:
      id (AutoField): The auto increment ID field.

      club (ForeignKey): This field references the Club model, indicating to which club the
        rule belongs.

      name (CharField): The name of rule.
      value (CharField): The content of booking rule. This field is optional.
      sport_type (CharField): The sport type of the rule. Possible values are (but not limited):
        T - tennis, G - ping pong, D - paddle, B - badminton, S - squash, F5 - football-5 ...
    """
    id = models.AutoField(primary_key=True)

    club = models.ForeignKey("Club")

    name = models.CharField(max_length=10)
    value = models.CharField(max_length=20, blank=True)
    sport_type = models.CharField(max_length=3, choices=SPORT_CHOICES)

    class Meta:
        unique_together = (("club", "sport_type", "name"),)


class FacilityRule(BaseModel):
    """ This is the a booking rule of a particular facility.

    This rule has the highest priority, it will override both ClubRule and SportRule.

    Attributes:
      id (AutoField): The auto increment ID field.

      facility (ForeignKey): This field references the facility model, indicating to which facility
        the rule belongs.

      name (CharField): The name of rule.
      value (CharField): The content of the booking rule. This field is optional.
    """
    id = models.AutoField(primary_key=True)

    facility = models.ForeignKey("Facility")

    name = models.CharField(max_length=10)
    value = models.CharField(max_length=20, blank=True)


class Event(BaseModel):
    """ This is a club event.

    Attributes:
      id (AutoField): The auto increment ID of event.

      club (ForeignKey): This field references the Club model, indicating to which club the
        event belongs.

      start (DateTimeField): The start datetime of event.
      end (DateTimeField): The end datetime of event.

      name (CharField): The name/title of event.
      event_type (CharField): The event type.
      privacy (CharField): The privacy. Possible values are: U - public, P - private,
        R - special restriction.
    """
    id = models.AutoField(primary_key=True)

    club = models.ForeignKey("Club")

    start = models.DateTimeField()
    end = models.DateTimeField()

    name = models.CharField(max_length=50)
    event_type = models.CharField(max_length=10)
    privacy = models.CharField(max_length=1, choices=PRIVACY_CHOICES)
    content = models.TextField()


class Bill(BaseModel):
    """ This is a bill of a club for its subscription.

    Attributes:
      id (AutoField): The auto increment ID of bill.

      club (ForeignKey): This field references the Club model, indicating which club should make
        the bill.

      amount (DecimalField): The amount paid.
      currency (CharField): The ISO code of currency.
      status (CharField): Billing status. Possible values are: P - pending, S - submitted,
        C - confirmed, A - canceled.
      message (CharField): The attached message with bill. This could be optional.
    """
    id = models.AutoField(primary_key=True)
    club = models.ForeignKey("Club")
    period = models.CharField(max_length=6, help_text="Period corresponding to this bill, can be a year like 2015 or a month + year like 201504")
    time_unit = models.CharField(max_length=1, choices=BILLING_TIME_UNITS_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3)
    status = models.CharField(max_length=1, choices=BILLING_STATUS_CHOICES)
    message = models.CharField(max_length=128, blank=True)


class MembershipRequest(BaseModel):
    """ This is a membership request.

    A membership request could be either a join request from user, or an invitation from the club.

    Attributes:
      id (AutoField): The auto increment ID of membership request.

      member (ForeignKey): This field references the Member model in member module.
      club (ForeignKey): This field references the Club model.

      request_type (CharField): This is the request type. Possible values are: MR - Member request,
        CI - Club invitation.
      status (CharField): The status of request. Possible values are: P - Pending, A - Approved,
        I - Ignored, R - Rejected.
      content (CharField): This is the content of request. This is optional.
    """
    id = models.AutoField(primary_key=True)

    member = models.ForeignKey("member.Member")
    club = models.ForeignKey("Club")

    request_type = models.CharField(max_length=2, choices=MEMBERSHIP_REQUEST_TYPE_CHOICES)
    status = models.CharField(max_length=1, choices=MEMBERSHIP_REQUEST_STATUS_CHOICES)
    content = models.CharField(max_length=100, blank=True)


class ClubRate(BaseModel):
    """ This is the rate of a type of sport of a club.

    Attributes:
      id (AutoField): The auto generated ID.

      club (ForeignKey): This field references the Club model.

      sport_type (CharField): The type of sport. Possible values are (but not limited):
        T - tennis, G - ping pong, D - paddle, B - badminton, S - squash, F5 - football-5 ...
      time_unit (CharField): The time unit. Possible values are: M - Minute, H - Hour, D - Day,
        N - Month, Y - Year.
      rate (DecimalField): The price.
      currency: This is the ISO code of currency.
    """
    id = models.AutoField(primary_key=True)

    club = models.ForeignKey("Club")

    sport_type = models.CharField(max_length=3, choices=SPORT_CHOICES)
    time_unit = models.CharField(max_length=1, choices=TIME_UNIT_CHOICES)
    rate = models.DecimalField(max_digits=5, decimal_places=0)
    currency = models.CharField(max_length=3)


class FacilityRate(BaseModel):
    """ This is the particular rate of a facility.

    This rate will overrides the general rates of a club.

    Attributes:
      id (AutoField): The auto generated ID.

      facility (ForeignKey): This field references the Facility model.

      time_unit (CharField): The time unit. Possible values are: M - Minute, H - Hour, D - Day,
        N - Month, Y - Year.
      rate (DecimalField): The price.
      currency: This is the ISO code of currency.
    """
    id = models.AutoField(primary_key=True)

    facility = models.ForeignKey("Facility")

    time_unit = models.CharField(max_length=1, choices=TIME_UNIT_CHOICES)
    rate = models.DecimalField(max_digits=5, decimal_places=0)
    currency = models.CharField(max_length=3)
