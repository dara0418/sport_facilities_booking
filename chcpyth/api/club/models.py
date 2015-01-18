from django.db import models
from django.core.exceptions import ValidationError

from django_extensions.db.fields import UUIDField

from core.models import BaseModel
from helpers.constants import (
    STATUS_CHOICES, SPORT_CHOICES, PAYMENT_STATUS_CHOICES, TIME_UNIT_CHOICES, PRIVACY_CHOIES,
    MEMBERSHIP_REQUEST_STATUS_CHOICES, MEMBERSHIP_REQUEST_TYPE_CHOICES
)

class Club(BaseModel):
    """ This is the Club entity.

    Attributes:
      id (AutoField): The auto increment ID of club.
      ref (UUIDField): The auto generated UUID.

      name (CharField): Name of club.
      description (CharField): This field describes the club.
      url (CharField): A customized URL pointing to the profile page of club. This is optional.
      status (CharField): Indicates the status of club. Possible values are:
        'active' and 'inactive'.

      email (EmailField): The email address.
      primary_phone_number (CharField): The primary phone number to contact.
      secondary_phone_number (CharField): The secondary phone number. This is optional.
      fax_number (CharField): The fax number. This is optional.

      address (ForeignKey): This is a foreign key field, it references the 'core.Address' model.
    """
    id = models.AutoField(primary_key=True)
    ref = UUIDField(version=4)

    name = models.CharField(max_length=100)
    description = models.CharField(max_length=2048)
    url = models.CharField(max_length=255, blank=True, unique=True)
    status = models.CharField(max_length=8, choices=STATUS_CHOICES)

    email = models.EmailField(max_length=255)
    primary_phone = models.CharField(max_length=20)
    secondary_phone = models.CharField(max_length=20, blank=True)
    fax_number = models.CharField(max_length=20, blank=True)

    address = models.ForeignKey('core.Address')


class Subscription(BaseModel):
    """ This is the subscription of a club.

    A Club subscribes a SubscriptionPlan in the 'core' module.

    Attributes:
      id (AutoField): The auto increment ID of subscription.

      club (ForeignKey): This field references the Club model.
      plan (ForeignKey): This field references the 'core.Subscription' model.

      expire_date (DateField): The termination date of current subscription.
      status (CharField): The status of subscription. Possible values are:
        'active' and 'inactive'.
    """
    id = models.AutoField(primary_key=True)

    club = models.ForeignKey('Club')
    plan = models.ForeignKey('core.SubscriptionPlan')

    expire_date = models.DateField()
    status = models.CharField(max_length=8, choices=STATUS_CHOICES)


class Facility(BaseModel):
    """ This is a club facility.

    Attributes:
      id (AutoField): The auto increment ID of facility.
      ref (UUIDField): The UUID of facility.

      club (ForeignKey): This field references the Club model, indicating to which club the
        facility belongs.

      name (CharField): The name of facility.
      description (CharField): The description of facility. This could be optional.
      sport_type (CharField): The sport type of facility. Possible values are:
        T - tennis, G - ping pong, D - paddle, B - badminton, S - squash, F5 - football-5 ...
      status (CharField): The status of facility. Possible values are: 'active', 'inactive'.
    """
    id = models.AutoField(primary_key=True)
    ref = UUIDField(version=4)

    club = models.ForeignKey('Club')

    name = models.CharField(max_length=50)
    description = models.CharField(max_length=1024, blank=True)
    sport_type = models.CharField(max_length=3, choices=SPORT_CHOICES)
    status = models.CharField(max_length=8, choices=STATUS_CHOICES)


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

    club = models.ForeignKey('Club')

    name = models.CharField(max_length=10)
    value = models.CharField(max_length=20, blank=True)


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

    club = models.ForeignKey('Club')

    name = models.CharField(max_length=10)
    value = models.CharField(max_length=20, blank=True)
    sport_type = models.CharField(max_length=3, choices=SPORT_CHOICES)


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

    club = models.ForeignKey('Club')

    start = models.DateTimeField()
    end = models.DateTimeField()

    name = models.CharField(max_length=50)
    event_type = models.CharField(max_length=10)
    privacy = models.CharField(max_length=1, choices=PRIVACY_CHOIES)
    content = models.TextField()


class Payment(BaseModel):
    """ This is a payment of a club for its subscription.

    Attributes:
      id (AutoField): The auto increment ID of payment.

      club (ForeignKey): This field references the Club model, indicating which club should make
        the payment.

      amount (DecimalField): The amount paid.
      currency (CharField): The ISO code of currency.
      status (CharField): Payment status. Possible values are: P - pending, S - submitted,
        C - confirmed, A - canceled.
      message (CharField): The attached message with payment. This could be optional.
    """
    id = models.AutoField(primary_key=True)

    club = models.ForeignKey('Club')

    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3)
    status = models.CharField(max_length=1, choices=PAYMENT_STATUS_CHOICES)
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

    member = models.ForeignKey('member.Member')
    club = models.ForeignKey('Club')

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
      currency: This is the ISO code of currency.
    """
    id = models.AutoField(primary_key=True)

    club = models.ForeignKey('Club')

    sport_type = models.CharField(max_length=3, choices=SPORT_CHOICES)
    time_unit = models.CharField(max_length=1, choices=TIME_UNIT_CHOICES)
    rate = models.DecimalField(max_digits=5, decimal_places=0)
    currency = models.CharField(max_length=3)
