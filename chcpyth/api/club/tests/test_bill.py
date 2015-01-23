from copy import copy

from django.test import TestCase
from django.db import transaction
from django.core.exceptions import ValidationError

from club.models import Bill
from test_data.club_data import ClubDataProvider
from test_data.bill_data import BillDataProvider
from test_base import ClubTestBase

class BillTestCase(ClubTestBase):
    """ This is the unit test case for Bill model.
    """
    def __init__(self, *args, **kwargs):
        super(BillTestCase, self).__init__(*args, **kwargs)

        data_prov = BillDataProvider()
        self.entity1 = data_prov.get_entity1()
        self.entity2 = data_prov.get_entity2()

    def test_CRUD(self):
        """ Test CRUD functions of the Bill model.
        """
        entity1 = self.entity1

        entity1.save()
        self.assertIsNotNone(entity1.id)

        savedEntity = Bill.objects.get(pk=entity1.id)
        self.assertIsNotNone(savedEntity)

        entity1.amoun = 9999
        entity1.save()
        updatedEntity = Bill(pk=entity1.id)
        self.assertEqual(entity1.amoun, 9999)

        entity1.delete()
        with self.assertRaises(Bill.DoesNotExist):
            Bill.objects.get(pk=entity1.id)

        transaction.rollback()

    # NOT NULL constraints.

    def test_amount_not_null(self):
        """ Tests NOT NULL constraint of amount.
        """
        buffer = copy(self.entity1)
        buffer.amount = None
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

    def test_status_not_null(self):
        """ Tests NOT NULL constraint of status.
        """
        buffer = copy(self.entity1)
        buffer.status = None
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    # CHECK constraints.

    def test_status_value(self):
        """ Tests CHECK constraint of status.
        """
        buffer = copy(self.entity1)
        buffer.status = "9"
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    def test_amount_value(self):
        """ Tests CHECK constraint of amount.
        """
        buffer = copy(self.entity1)
        buffer.amount = "NOT A NUMBER"
        with self.assertRaises(ValidationError):
            buffer.save()
    
        transaction.rollback()

    # FOREIGN KEY constraints.

    def test_club_fk(self):
        """ Tests FOREIGN KEY constraint of club.
        """
        self.entity1.club_id = 999

        with self.assertRaises(ValidationError):
            self.entity1.save()

        transaction.rollback()
