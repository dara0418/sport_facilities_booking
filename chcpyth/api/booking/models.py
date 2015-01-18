from django.db import models

from core.models import BaseModel
from helpers.constants import TIME_UNIT_CHOICES

class Booking(BaseModel):
    """ This model is a booking of a club facility.

    Attributes:
      id (AutoField): The auto increment ID of the booking.
      facility (ForeignKey): This filed references the Facility model in club module.

      booking_date (DateField): The date of booking.
      booking_timeslot (DecimalField): The timeslot of booking. It uses a 4 digits number to present
        time. For example: 9:00am should be 0900. However, some booking may hold the facility for
        a whole day, or even a whole week. In such case, leave this field empty.
      time_unit (CharField): The time unit of booking duration. Possible values are: M - Minute,
        H - Hour, D - Day, N - Month, Y - Year.
      duration (DecimalField): The duration of booking based on time_unit.

      notes (CharField): The user's notes. This is optional.
      num_of_booking (DecimalField): Total number of people will take the facility.
      rate (DecimalField): The price of facility based on time_unit. This is a snapshot of price
        rate of booked facility. The original price may change time by time, so we need a snapshot.
      currency (CharField): The ISO code of currency.
    """
    id = models.AutoField(primary_key=True)

    facility = models.ForeignKey('club.Facility')

    booking_date = models.DateField()
    booking_timeslot = models.DecimalField(max_digits=4, decimal_places=0, blank=True, null=True)
    time_unit = models.CharField(max_length=1, choices=TIME_UNIT_CHOICES)
    duration = models.DecimalField(max_digits=5, decimal_places=0)

    notes = models.CharField(max_length=100, blank=True)
    num_of_booking = models.DecimalField(max_digits=2, decimal_places=0)
    rate = models.DecimalField(max_digits=5, decimal_places=0)
    currency = models.CharField(max_length=3)


class BookingMember(BaseModel):
    """ This model presents the relationship between member and booking.

    A booking may have relationship with multiple members.

    Attributes:
      id: The auto increment ID.

      booking: This field references the booking.Booking model.
      member: This field references the member.Member model.

      is_booker: Whether this member is the booker.
    """
    id = models.AutoField(primary_key=True)

    booking = models.ForeignKey('booking.Booking')
    member = models.ForeignKey('member.Member')

    is_booker = models.BooleanField()
