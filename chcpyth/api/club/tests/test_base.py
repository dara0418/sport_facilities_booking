from abc import ABCMeta

from django.test import TestCase

from test_data.club_data import ClubDataProvider
from test_data.facility_data import FacilityDataProvider

class ClubTestBase(TestCase):
    """ This is an abstract base test case for testing club related models (such as ClubRule, Bill).

    It sets up the basic club entities and foreign key references.
    """
    __metaclass__ = ABCMeta

    def setUp(self):
        club_prov = ClubDataProvider()
        club1 = club_prov.get_entity1()
        club2 = club_prov.get_entity2()

        club1.save()
        club2.save()

        self.entity1.club_id = club1.id
        self.entity2.club_id = club2.id


class FacilityTestBase(TestCase):
    """ This is an abstract base test case for testing facility related models (such as FacilityRate).

    It sets up the basic club entities, facility entities and foreign key references.
    """
    __metaclass__ = ABCMeta

    def setUp(self):
        club_prov = ClubDataProvider()
        club1 = club_prov.get_entity1()
        club2 = club_prov.get_entity2()

        facility_prov = FacilityDataProvider()
        facility1 = facility_prov.get_entity1()
        facility2 = facility_prov.get_entity2()

        club1.save()
        club2.save()

        facility1.club_id = club1.id
        facility2.club_id = club2.id

        facility1.save()
        facility2.save()

        self.entity1.facility_id = facility1.id
        self.entity2.facility_id = facility2.id
