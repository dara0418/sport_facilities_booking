from copy import copy

from django.test import TestCase
from django.db import transaction
from django.core.exceptions import ValidationError

from member.models import Member
from test_data.member_data import MemberDataProvider

class MemberTestCase(TestCase):
    """ This is the unit test case for Member model.
    """
    def __init__(self, *args, **kwargs):
        super(MemberTestCase, self).__init__(*args, **kwargs)

        data_prov = MemberDataProvider()
        self.entity1 = data_prov.get_entity1()
        self.entity2 = data_prov.get_entity2()

    def test_CRUD(self):
        """ Test CRUD functions of the Member model.
        """
        entity1 = self.entity1

        entity1.save()
        self.assertIsNotNone(entity1.id)

        savedEntity = Member.objects.get(pk=entity1.id)
        self.assertIsNotNone(savedEntity)
        self.assertIsNotNone(savedEntity.ref)

        entity1.avatar = "my_new_photo.png"
        entity1.save()
        updatedEntity = Member(pk=entity1.id)
        self.assertEqual(entity1.avatar, "my_new_photo.png")

        entity1.delete()
        with self.assertRaises(Member.DoesNotExist):
            Member.objects.get(pk=entity1.id)

        # One more test for very simple user, like registration with email and password only.
        self.entity2.save()
        self.assertIsNotNone(self.entity2.id)

        transaction.rollback()

    # NOT NULL constraints.
    def test_email_not_null(self):
        """ Tests NOT NULL constraint of email.
        """
        buffer = copy(self.entity1)
        buffer.email = None
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    def test_password_not_null(self):
        """ Tests NOT NULL constraint of password.
        """
        buffer = copy(self.entity1)
        buffer.password = None
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    # CHECK constraints.

    def test_title_value(self):
        """ Tests CHECK constraint of title.
        """
        buffer = copy(self.entity1)
        buffer.title = "99"
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    def test_dob_value(self):
        """ Tests CHECK constraint of dob.
        """
        buffer = copy(self.entity1)
        buffer.dob = "NOT A VALID DATE"
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    def test_email_value(self):
        """ Tests CHECK constraint of email.
        """
        buffer = copy(self.entity1)
        buffer.email = "BAD EMAIL"
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    # UNIQUE constraints.

    def test_email_unique(self):
        """ Tests UNIQUE constraint of email.
        """
        self.entity1.save()
        self.entity2.email = self.entity1.email

        with self.assertRaises(ValidationError):
            self.entity2.save()

        transaction.rollback()

    # FOREIGN KEY constraints.

    def test_address_fk(self):
        """ Tests FOREIGN KEY constraint of address.
        """
        self.entity1.address_id = 999

        with self.assertRaises(ValidationError):
            self.entity1.save()

        transaction.rollback()

    # Other methods.

    def test_get_short_name(self):
        """ Test the get_short_name function.
        """
        short_name = self.entity1.get_short_name()
        self.assertEqual(short_name, self.entity1.email)

    def test_get_full_name(self):
        """ Test the get_full_name function.
        """
        full_name = self.entity1.get_full_name()
        self.assertEqual(full_name, "Cool Man")
