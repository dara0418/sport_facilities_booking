from django.db import models

from helpers.constants import LEVEL_CHOICES, FREQUENCY_CHOICES

class BaseModel(models.Model):
    """ The base of all other models.

    This model is abstract.

    Attributes:
      creation_datetime (DateTimeField): Date and time of when the model was first
        created. The value will be attached automatically on object creation.

      last_modified_datetime (DateTimeField): Date and time of when the model was last
        modified. The value will be attached automatically each time the object is saved.
    """
    creation_datetime = models.DateTimeField(auto_now_add=True)
    last_modified_datetime = models.DateTimeField(auto_now_add=True, auto_now=True)

    def get_creation_datetime(self):
        return self.creation_datetime

    def get_last_modified_datetime(self):
        return self.last_modified_datetime

    def save(self, *args, **kwargs):
        self.full_clean()
        super(BaseModel, self).save(*args, **kwargs);

    class Meta:
        abstract = True


class Address(BaseModel):
    """ This class presents a real world address.

    Attributes:
      id (AutoField): The auto increment ID of address.
      line1 (CharField): The address line 1. It could be house/apartment number and name.
        Users may also put their street name in this line.
      line2 (CharField): Generall this could be the street name. This is optional.
      city (CharField): The city name.
      province (CharField): The province/county name.
      country (CharField): The ISO code of country.
      zip_code (CharField): The zip code. This is optional.
      longitude (FloatField): The longtitude of address. This is generally used by club users
        to tag their addresses on map view.
      latitude (FloatField): The latitude of address. This is generally used by club users to
        tag their addresses on map view.
    """
    id = models.AutoField(primary_key=True)

    line1 = models.CharField(max_length=75)
    line2 = models.CharField(max_length=75, blank=True)
    city = models.CharField(max_length=50)
    province = models.CharField(max_length=50)
    country = models.CharField(max_length=2)
    zip_code = models.CharField(max_length=10, blank=True)

    longitude = models.FloatField(null=True, blank=True)
    latitude = models.FloatField(null=True, blank=True)


class SubscriptionPlan(BaseModel):
    """ This is the subscription plan for clubs to subscribe.

    Attributes:
      id (AutoField): The auto increment ID of plan.

      name (CharField): The name of plan.
      frequency (CharField): This is the time frame of subscription. It uses shortcuts to indicate
        time frame type: DY - Daily, MY - Monthly, QY - Quarterly, YY - Yearly.
      rate (DecimalField): Price rate based on time frame.
      currency (CharField): The ISO code of currency.
      level (CharField): The privilege of plan. Possible values are: B - Bronze, S - Silver,
        G - Gold, P - Platinum.
    """
    id = models.AutoField(primary_key=True)

    name = models.CharField(max_length=20, unique=True)
    frequency = models.CharField(max_length=2,choices=FREQUENCY_CHOICES)
    rate = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3)
    level = models.CharField(max_length=1, choices=LEVEL_CHOICES)
