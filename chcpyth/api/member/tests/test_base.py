from abc import ABCMeta

from django.test import TestCase

from test_data.member_data import MemberDataProvider
from test_data.event_data import EventDataProvider
from test_data.club_data import ClubDataProvider

class MemberTestBase(TestCase):
    """ This is an abstract base test case for testing member related models (such as Membership).

    It sets up the basic member entities, club entities and foreign key references.
    """
    __metaclass__ = ABCMeta

    def setUp(self):
        member_prov = MemberDataProvider()
        member1 = member_prov.get_entity1()
        member2 = member_prov.get_entity2()

        member1.save()
        member2.save()

        club_prov = ClubDataProvider()
        club1 = club_prov.get_entity1()
        club2 = club_prov.get_entity2()

        club1.save()
        club2.save()

        event_prov = EventDataProvider()
        event1 = event_prov.get_entity1()
        event2 = event_prov.get_entity2()
        event1.club_id = club1.id
        event2.club_id = club2.id

        event1.save()
        event2.save()

        self.entity1.member_id = member1.id
        self.entity2.member_id = member2.id
        self.entity1.club_id = club1.id
        self.entity2.club_id = club2.id
        self.entity1.event_id = event1.id
        self.entity2.event_id = event2.id
