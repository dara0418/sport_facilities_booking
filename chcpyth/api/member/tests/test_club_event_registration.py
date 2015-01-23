from copy import copy

from django.test import TestCase
from django.db import transaction
from django.core.exceptions import ValidationError

from member.models import ClubEventRegistration
from test_data.club_event_registration_data import ClubEventRegistrationDataProvider
from test_base import MemberTestBase

class ClubEventRegistrationTestCase(MemberTestBase):
    """ This is the unit test case for ClubEventRegistration model.
    """
    def __init__(self, *args, **kwargs):
        super(ClubEventRegistrationTestCase, self).__init__(*args, **kwargs)

        data_prov = ClubEventRegistrationDataProvider()
        self.entity1 = data_prov.get_entity1()
        self.entity2 = data_prov.get_entity2()

    def test_CRUD(self):
        """ Test CRUD functions of the ClubEventRegistration model.
        """
        entity1 = self.entity1

        entity1.save()
        self.assertIsNotNone(entity1.id)

        savedEntity = ClubEventRegistration.objects.get(pk=entity1.id)
        self.assertIsNotNone(savedEntity)

        # Update operation didn't tested. There are just two foreign key fields.

        entity1.delete()
        with self.assertRaises(ClubEventRegistration.DoesNotExist):
            ClubEventRegistration.objects.get(pk=entity1.id)

        transaction.rollback()

    # FOREIGN KEY constraints.

    def test_member_fk(self):
        """ Tests FOREIGN KEY constraint of member.
        """
        self.entity1.member_id = 999

        with self.assertRaises(ValidationError):
            self.entity1.save()

        transaction.rollback()

    def test_event_fk(self):
        """ Tests FOREIGN KEY constraint of event.
        """
        self.entity1.event_id = 999

        with self.assertRaises(ValidationError):
            self.entity1.save()

        transaction.rollback()
