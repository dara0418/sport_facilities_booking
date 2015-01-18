from core.models import Address

from data_provider import DataProvider
from test_base import BaseTestCase

class AddressDataProvider(DataProvider):
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

class AddressTestCase(BaseTestCase):
    """ This is the unit test case for Address model.
    """
    def get_data_prov(self):
        return AddressDataProvider()

    def test_address_creation(self):
        """ Tests the creation of address.
        """
        self.entity1.save()

        saved = Address.objects.get(id=self.entity1.id)
        self.assertIsNotNone(saved)
