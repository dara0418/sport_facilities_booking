from copy import copy

from django.test import TestCase
from django.db import transaction
from django.core.exceptions import ValidationError

from booking.models import Booking
from test_data.booking_data import BookingDataProvider
from test_base import TestBase

class BookingTestCase(TestBase):
    """ This is the unit test case for Booking model.
    """
    def __init__(self, *args, **kwargs):
        super(BookingTestCase, self).__init__(*args, **kwargs)

        data_prov = BookingDataProvider()
        self.entity1 = data_prov.get_entity1()
        self.entity2 = data_prov.get_entity2()

    def test_CRUD(self):
        """ Test CRUD functions of the Booking model.
        """
        entity1 = self.entity1

        entity1.save()
        self.assertIsNotNone(entity1.id)

        savedEntity = Booking.objects.get(pk=entity1.id)
        self.assertIsNotNone(savedEntity)

        entity1.notes = "Easy booking"
        entity1.save()
        updatedEntity = Booking(pk=entity1.id)
        self.assertEqual(entity1.notes, "Easy booking")

        entity1.delete()
        with self.assertRaises(Booking.DoesNotExist):
            Booking.objects.get(pk=entity1.id)

        transaction.rollback()

    # NOT NULL constraints.

    def test_booking_date_not_null(self):
        """ Tests NOT NULL constraint of booking_date.
        """
        buffer = copy(self.entity1)
        buffer.booking_date = None
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    def test_duration_not_null(self):
        """ Tests NOT NULL constraint of duration.
        """
        buffer = copy(self.entity1)
        buffer.duration = None
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    def test_num_of_booking_not_null(self):
        """ Tests NOT NULL constraint of num_of_booking.
        """
        buffer = copy(self.entity1)
        buffer.num_of_booking = None
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    def test_rate_not_null(self):
        """ Tests NOT NULL constraint of rate.
        """
        buffer = copy(self.entity1)
        buffer.rate = None
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    def test_currency_not_null(self):
        """ Tests NOT NULL constraint of currency.
        """
        buffer = copy(self.entity1)
        buffer.currency = None
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    # CHECK constraints.

    def test_booking_timeslot_value(self):
        """ Tests CHECK constraint of booking_timeslot.
        """
        buffer = copy(self.entity1)
        buffer.booking_timeslot = "NOT A NUMBER"
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    def test_time_unit_value(self):
        """ Tests CHECK constraint of time_unit.
        """
        buffer = copy(self.entity1)
        buffer.time_unit = "9"
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    def test_duration_value(self):
        """ Tests CHECK constraint of duration.
        """
        buffer = copy(self.entity1)
        buffer.duration = "NOT A NUMBER"
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    def test_num_of_booking_value(self):
        """ Tests CHECK constraint of num_of_booking.
        """
        buffer = copy(self.entity1)
        buffer.num_of_booking = "NOT A NUMBER"
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    def test_rate_value(self):
        """ Tests CHECK constraint of rate.
        """
        buffer = copy(self.entity1)
        buffer.rate = "NOT A NUMBER"
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    # FOREIGN KEY constraints.

    def test_facility_fk(self):
        """ Tests FOREIGN KEY constraint of facility.
        """
        self.entity1.facility_id = 999

        with self.assertRaises(ValidationError):
            self.entity1.save()

        transaction.rollback()
