from copy import copy

from django.test import TestCase
from django.db import transaction
from django.core.exceptions import ValidationError

from core.models import Address
from test_data.address_data import AddressDataProvider

class AddressTestCase(TestCase):
    """ This is the unit test case for Address model.
    """
    def __init__(self, *args, **kwargs):
        super(AddressTestCase, self).__init__(*args, **kwargs)

        data_prov = AddressDataProvider()
        self.entity1 = data_prov.get_entity1()
        self.entity2 = data_prov.get_entity2()

    def test_CRUD(self):
        """ Tests the CRUD operations of Address.
        """
        entity1 = self.entity1

        entity1.save()
        self.assertIsNotNone(entity1.id)

        savedEntity = Address.objects.get(pk=entity1.id)
        self.assertIsNotNone(savedEntity)

        entity1.zip_code = "N/A"
        entity1.save()
        updatedEntity = Address.objects.get(pk=entity1.id)
        self.assertEqual(entity1.zip_code, "N/A")

        entity1.delete()
        with self.assertRaises(Address.DoesNotExist):
            Address.objects.get(pk=entity1.id)

        transaction.rollback()

    # NOT NULL constraints.

    def test_line1_not_null(self):
        """ Tests NOT NULL constraint of line1.
        """
        buffer = copy(self.entity1)
        buffer.line1 = None
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    def test_city_not_null(self):
        """ Tests NOT NULL constraint of city.
        """
        buffer = copy(self.entity1)
        buffer.city = None
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    def test_province_not_null(self):
        """ Tests NOT NULL constraint of province.
        """
        buffer = copy(self.entity1)
        buffer.province = None
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    def test_country_not_null(self):
        """ Tests NOT NULL constraint of country.
        """
        buffer = copy(self.entity1)
        buffer.country = None
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()
