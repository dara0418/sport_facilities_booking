from copy import copy

from django.test import TestCase
from django.db import transaction
from django.core.exceptions import ValidationError

from core.models import Address

class AddressDataProvider:
    """ This class provides data for testing Address model.
    """
    def get_entity1(self):
        address = Address()
        address.line1 = "17, The Pines, Diamond Valley"
        address.line2 = "Upper Dargle Road"
        address.city = "Bray"
        address.province = "Wicklow"
        address.country = "IE"
        address.zip_code = "Wicklow"

        return address

    def get_entity2(self):
        address = Address()
        address.line1 = "32, Lower O'Connell Street"
        address.city = "Dublin"
        address.province = "Dublin"
        address.country = "IE"
        address.zip_code = "Dublin1"
        address.longtitude = 53.349559
        address.latitude = -6.259747

        return address


class AddressTestCase(TestCase):
    """ This is the unit test case for Address model.
    """
    data_prov = AddressDataProvider()
    entity1 = data_prov.get_entity1()
    entity2 = data_prov.get_entity2()

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
