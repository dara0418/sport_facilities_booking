from abc import ABCMeta

from django.test import TestCase

from test_data.club_data import ClubDataProvider
from test_data.facility_data import FacilityDataProvider
from test_data.member_data import MemberDataProvider
from test_data.booking_data import BookingDataProvider

class TestBase(TestCase):
    """ This is an abstract base test case for setting up data dependencies.

    It pre saves two club entities and two facility entities.
    """
    __metaclass__ = ABCMeta

    def set_up_dependencies(self, entity1, entity2):
        club_prov = ClubDataProvider()
        club1 = club_prov.get_entity1()
        club2 = club_prov.get_entity2()

        club1.save()
        club2.save()

        facility_prov = FacilityDataProvider()
        facility1 = facility_prov.get_entity1()
        facility2 = facility_prov.get_entity2()

        facility1.club_id = club1.id
        facility2.club_id = club2.id

        facility1.save()
        facility2.save()

        entity1.facility_id = facility1.id
        entity2.facility_id = facility2.id

    def setUp(self):
        self.set_up_dependencies(self.entity1, self.entity2)


class BookingTestBase(TestBase):
    """ This is an abstract base test case for testing Booking related models (such as BookingMember).

    It sets up baisc dependencies, and two booking entities.
    """
    __metaclass__ = ABCMeta

    def setUp(self):
        booking_prov = BookingDataProvider()
        booking1 = booking_prov.get_entity1()
        booking2 = booking_prov.get_entity2()

        self.set_up_dependencies(booking1, booking2)

        booking1.save()
        booking2.save()

        member_prov = MemberDataProvider()
        member1 = member_prov.get_entity1()
        member2 = member_prov.get_entity2()

        member1.save()
        member2.save()

        self.entity1.booking_id = booking1.id
        self.entity2.booking_id = booking2.id
        self.entity1.member_id = member1.id
        self.entity2.member_id = member2.id
