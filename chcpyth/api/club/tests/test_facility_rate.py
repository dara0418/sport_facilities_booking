from copy import copy

from django.test import TestCase
from django.db import transaction
from django.core.exceptions import ValidationError

from club.models import FacilityRate
from test_data.facility_rate_data import FacilityRateDataProvider
from test_base import FacilityTestBase

class FacilityRateTestCase(FacilityTestBase):
    """ This is the unit test case for FacilityRate model.
    """
    def __init__(self, *args, **kwargs):
        super(FacilityRateTestCase, self).__init__(*args, **kwargs)

        data_prov = FacilityRateDataProvider()
        self.entity1 = data_prov.get_entity1()
        self.entity2 = data_prov.get_entity2()

    def test_CRUD(self):
        """ Test CRUD functions of the FacilityRate model.
        """
        entity1 = self.entity1

        entity1.save()
        self.assertIsNotNone(entity1.id)

        savedEntity = FacilityRate.objects.get(pk=entity1.id)
        self.assertIsNotNone(savedEntity)

        entity1.rate = 9999
        entity1.save()
        updatedEntity = FacilityRate(pk=entity1.id)
        self.assertEqual(entity1.rate, 9999)

        entity1.delete()
        with self.assertRaises(FacilityRate.DoesNotExist):
            FacilityRate.objects.get(pk=entity1.id)

        transaction.rollback()

    # NOT NULL constraints.

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

    def test_facility_fk(self):
        """ Tests FOREIGN KEY constraint of facility.
        """
        self.entity1.facility_id = 999

        with self.assertRaises(ValidationError):
            self.entity1.save()

        transaction.rollback()
