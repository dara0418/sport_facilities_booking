from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

from django_extensions.db.fields import UUIDField

from core.models import BaseModel
from helpers.constants import TITLE_CHOICES, GENDER_CHOICES, CLUB_ROLE_CHOICES


class MemberManager(BaseUserManager):
    def create_user(self, email, password):
        if not email:
            msg = "Email address is required to sign up"
            raise ValueError(msg)

        if not password:
            msg = "Password is required to sign up"
            raise ValueError(msg)

        member = self.model(
            email=MemberManager.normalize_email(email)
        )
        member.set_password(password)
        member.save(using=self._db)

        return member

    def create_superuser(self, email, password):
        if not email:
            msg = "Email address is required to sign up"
            raise ValueError(msg)

        if not password:
            msg = "Password is required to sign up"
            raise ValueError(msg)

        member = self.model(
            email=MemberManager.normalize_email(email)
        )

        member.is_admin = True
        member.is_staff = True
        member.is_superuser = True

        member.set_password(password)
        member.save(using=self._db)

        return member


class Member(BaseModel, AbstractBaseUser, PermissionsMixin):
    """ This is the member model.

    A member is simply a user of the booking system. However he/she may have some relationships
    with clubs. The user could be a general member, a professor player or an administrator of a
    club. This is a many to many relationship.

    Attributes:
      id (AutoField): The auto increment ID of member.
      ref (UUIDField): The UUID of member.

      title (CharField): Possible values are: MR, MS, MRS.
      gender (CharField): Possible values are: M - Male, F - Female.
      first_name (CharField): The first name.
      last_name (CharField): The last name.
      dob (DateField): Date of birth.
      avatar (CharField): The URL pointing to user's head portrait.

      email (EmailField): User email to sign up and sign in.
      landline (CharField): Land line number to contact.
      cellphone (CharField): User cell phone number.
      address (ForeignKey): This field references the 'core.Address' model.

      USERNAME_FIELD (string): This field indicates which field is the username for authentication.
        In our model, it should be user's email.
    """
    id = models.AutoField(primary_key=True)
    ref = UUIDField(version=4)

    title = models.CharField(max_length=3, blank=True, choices=TITLE_CHOICES)      # Do we need more titles, such as Doctor...?
    gender = models.CharField(max_length=1, blank=True, choices=GENDER_CHOICES)
    first_name = models.CharField(max_length=35, blank=True)
    last_name = models.CharField(max_length=35, blank=True)
    dob = models.DateField(null=True, blank=True)
    avatar = models.CharField(max_length=255, blank=True)

    email = models.EmailField(max_length=255, unique=True)
    landline = models.CharField(max_length=16, blank=True)
    cellphone = models.CharField(max_length=16, blank=True)
    address = models.ForeignKey('core.Address', null=True, blank=True)

    # PermissionsMixin required fields.
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    objects = MemberManager()

    def get_full_name(self):
        """ This function returns user's full name.
        """
        return (self.first_name + ' ' + self.last_name).strip()

    def get_short_name(self):
        """ This function returns user's identity (email).

        This function is required to customize a Django User.
        """
        return self.email


class Membership(BaseModel):
    """ This model presents the relationship between a member and a club.

    This is a many to many relationship.

    Attributes:
      id (AutoField): The auto increment ID field.

      member (ForeignKey): This field references the Member model.
      club (ForeignKey): This field references the Club model in club module.

      role (CharField): Role of membership. Possible values are: M - General member, P - Professor,
        A - Club administrator who can enter the club management interface.
    """
    id = models.AutoField(primary_key=True)

    member = models.ForeignKey('Member')
    club = models.ForeignKey('club.Club')

    role = models.CharField(max_length=1, choices=CLUB_ROLE_CHOICES)

    class Meta:
        unique_together = (("member", "club"),)


class ClubEventRegistration(BaseModel):
    """ This is the user registration of club events.

    Attributes:
      id (AutoField): The auto generated ID of registration.

      member (ForeignKey): This field references the Member model.
      event (ForeignKey): This field references the Event model in club module.
    """
    id = models.AutoField(primary_key=True)

    member = models.ForeignKey('Member')
    event = models.ForeignKey('club.Event')

    class Meta:
        unique_together = (("member", "event"),)

