from copy import copy

from django.test import TestCase
from django.db import transaction
from django.core.exceptions import ValidationError

from club.models import MembershipRequest
from test_data.member_data import MemberDataProvider
from test_data.membership_request_data import MembershipRequestDataProvider
from test_base import ClubTestBase

class MembershipRequestTestCase(ClubTestBase):
    """ This is the unit test case for MembershipRequest model.
    """
    def __init__(self, *args, **kwargs):
        super(MembershipRequestTestCase, self).__init__(*args, **kwargs)

        data_prov = MembershipRequestDataProvider()
        self.entity1 = data_prov.get_entity1()
        self.entity2 = data_prov.get_entity2()

    def setUp(self):
        super(MembershipRequestTestCase, self).setUp()

        member_prov = MemberDataProvider()
        member1 = member_prov.get_entity1()
        member2 = member_prov.get_entity2()

        member1.save()
        member2.save()

        self.entity1.member_id = member1.id
        self.entity2.member_id = member2.id

    def test_CRUD(self):
        """ Test CRUD functions of the MembershipRequest model.
        """
        entity1 = self.entity1

        entity1.save()
        self.assertIsNotNone(entity1.id)

        savedEntity = MembershipRequest.objects.get(pk=entity1.id)
        self.assertIsNotNone(savedEntity)

        entity1.status = "R"
        entity1.save()
        updatedEntity = MembershipRequest(pk=entity1.id)
        self.assertEqual(entity1.status, "R")

        entity1.delete()
        with self.assertRaises(MembershipRequest.DoesNotExist):
            MembershipRequest.objects.get(pk=entity1.id)

        transaction.rollback()

    # NOT NULL constraints.

    def test_request_type_not_null(self):
        """ Tests NOT NULL constraint of request_type.
        """
        buffer = copy(self.entity1)
        buffer.request_type = None
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    def test_status_not_null(self):
        """ Tests NOT NULL constraint of status.
        """
        buffer = copy(self.entity1)
        buffer.status = None
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    # CHECK constraints.

    def test_request_type_value(self):
        """ Tests CHECK constraint of request_type.
        """
        buffer = copy(self.entity1)
        buffer.request_type = "99"
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    def test_status_value(self):
        """ Tests CHECK constraint of status.
        """
        buffer = copy(self.entity1)
        buffer.status = "9"
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    # FOREIGN KEY constraints.

    def test_member_fk(self):
        """ Tests FOREIGN KEY constraint of member.
        """
        self.entity1.member_id = 999

        with self.assertRaises(ValidationError):
            self.entity1.save()

        transaction.rollback()

    def test_club_fk(self):
        """ Tests FOREIGN KEY constraint of club.
        """
        self.entity1.club_id = 999

        with self.assertRaises(ValidationError):
            self.entity1.save()

        transaction.rollback()
