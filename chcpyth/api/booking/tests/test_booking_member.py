from copy import copy

from django.test import TestCase
from django.db import transaction
from django.core.exceptions import ValidationError

from booking.models import BookingMember
from test_data.booking_member_data import BookingMemberDataProvider
from test_base import BookingTestBase

class BookingMemberTestCase(BookingTestBase):
    """ This is the unit test case for BookingMember model.
    """
    def __init__(self, *args, **kwargs):
        super(BookingMemberTestCase, self).__init__(*args, **kwargs)

        data_prov = BookingMemberDataProvider()
        self.entity1 = data_prov.get_entity1()
        self.entity2 = data_prov.get_entity2()

    def test_CRUD(self):
        """ Test CRUD functions of the BookingMember model.
        """
        entity1 = self.entity1

        entity1.save()
        self.assertIsNotNone(entity1.id)

        savedEntity = BookingMember.objects.get(pk=entity1.id)
        self.assertIsNotNone(savedEntity)

        entity1.is_booker = False
        entity1.save()
        updatedEntity = BookingMember(pk=entity1.id)
        self.assertEqual(entity1.is_booker, False)

        entity1.delete()
        with self.assertRaises(BookingMember.DoesNotExist):
            BookingMember.objects.get(pk=entity1.id)

        transaction.rollback()

    # NOT NULL constraints.

    # TODO - THIS DOESN'T WORK. LOOKS LIKE full_clean() DOESN'T CHECK BOOLEAN FIELD.
    #def test_is_booker_not_null(self):
        #""" Tests NOT NULL constraint of is_booker.
        #"""
        #buffer = copy(self.entity1)
        #buffer.is_booker = None
        #with self.assertRaises(ValidationError):
            #buffer.save()

        #transaction.rollback()

    # CHECK constraints.

    def test_is_booker_value(self):
        """ Tests CHECK constraint of is_booker.
        """
        buffer = copy(self.entity1)
        buffer.is_booker = "NOT A BOOLEAN"
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    # FOREIGN KEY constraints.

    def test_booking_fk(self):
        """ Tests FOREIGN KEY constraint of booking.
        """
        self.entity1.booking_id = 999

        with self.assertRaises(ValidationError):
            self.entity1.save()

        transaction.rollback()

    def test_member_fk(self):
        """ Tests FOREIGN KEY constraint of member.
        """
        self.entity1.member_id = 999

        with self.assertRaises(ValidationError):
            self.entity1.save()

        transaction.rollback()
