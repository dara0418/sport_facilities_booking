from core.models import Address
from club.models import Club
from .address_data import AddressDataProvider

class ClubDataProvider:
    """ This class provides data for testing Club model.
    """
    def __init__(self):
        address_prov = AddressDataProvider()
        self.address1 = address_prov.get_entity1()
        self.address2 = address_prov.get_entity2()

    def get_entity1(self):
        club = Club()
        club.name = "Tennis club"
        club.description = "This is a tennis club"
        club.status = "A"
        club.url = "tennis_club"
        club.email = "tennis.club@gmail.com"
        club.primary_phone = "650000000"
        club.secondary_phone = "651111111"
        club.fax_number = "652222222"
        club.address = self.address1

        return club

    def get_entity2(self):
        club = Club()
        club.name = "Pingpong club"
        club.description = "This is a pingpong club"
        club.status = "I"
        club.url = "pingpong_club"
        club.email = "pingpong.club@gmail.com"
        club.primary_phone = "653333333"
        club.address = self.address2

        return club
