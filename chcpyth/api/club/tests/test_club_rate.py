from copy import copy

from django.test import TestCase
from django.db import transaction
from django.core.exceptions import ValidationError

from club.models import ClubRate
from test_data.club_rate_data import ClubRateDataProvider
from test_base import ClubTestBase

class ClubRateTestCase(ClubTestBase):
    """ This is the unit test case for ClubRate model.
    """
    def __init__(self, *args, **kwargs):
        super(ClubRateTestCase, self).__init__(*args, **kwargs)

        data_prov = ClubRateDataProvider()
        self.entity1 = data_prov.get_entity1()
        self.entity2 = data_prov.get_entity2()

    def test_CRUD(self):
        """ Test CRUD functions of the ClubRate model.
        """
        entity1 = self.entity1

        entity1.save()
        self.assertIsNotNone(entity1.id)

        savedEntity = ClubRate.objects.get(pk=entity1.id)
        self.assertIsNotNone(savedEntity)

        entity1.time_unit = "D"
        entity1.save()
        updatedEntity = ClubRate(pk=entity1.id)
        self.assertEqual(entity1.time_unit, "D")

        entity1.delete()
        with self.assertRaises(ClubRate.DoesNotExist):
            ClubRate.objects.get(pk=entity1.id)

        transaction.rollback()

    # NOT NULL constraints.

    def test_sport_type_not_null(self):
        """ Tests NOT NULL constraint of sport_type.
        """
        buffer = copy(self.entity1)
        buffer.sport_type = None
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    def test_time_unit_not_null(self):
        """ Tests NOT NULL constraint of time_unit.
        """
        buffer = copy(self.entity1)
        buffer.time_unit = None
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

    def test_sport_type_value(self):
        """ Tests CHECK constraint of sport_type.
        """
        buffer = copy(self.entity1)
        buffer.sport_type = "9"
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

    def test_rate_value(self):
        """ Tests CHECK constraint of rate.
        """
        buffer = copy(self.entity1)
        buffer.rate = "I'M NOT A NUMBER"
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
