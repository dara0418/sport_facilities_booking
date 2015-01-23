from copy import copy

from django.test import TestCase
from django.db import transaction
from django.core.exceptions import ValidationError

from member.models import Membership
from test_data.membership_data import MembershipDataProvider
from test_base import MemberTestBase

class MembershipTestCase(MemberTestBase):
    """ This is the unit test case for Membership model.
    """
    def __init__(self, *args, **kwargs):
        super(MembershipTestCase, self).__init__(*args, **kwargs)

        data_prov = MembershipDataProvider()
        self.entity1 = data_prov.get_entity1()
        self.entity2 = data_prov.get_entity2()

    def test_CRUD(self):
        """ Test CRUD functions of the Membership model.
        """
        entity1 = self.entity1

        entity1.save()
        self.assertIsNotNone(entity1.id)

        savedEntity = Membership.objects.get(pk=entity1.id)
        self.assertIsNotNone(savedEntity)

        entity1.role = "P"
        entity1.save()
        updatedEntity = Membership(pk=entity1.id)
        self.assertEqual(entity1.role, "P")

        entity1.delete()
        with self.assertRaises(Membership.DoesNotExist):
            Membership.objects.get(pk=entity1.id)

        transaction.rollback()

    # NOT NULL constraints.

    def test_role_not_null(self):
        """ Tests NOT NULL constraint of role.
        """
        buffer = copy(self.entity1)
        buffer.role = None
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    # CHECK constraints.

    def test_role_value(self):
        """ Tests CHECK constraint of role.
        """
        buffer = copy(self.entity1)
        buffer.role = "9"
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
