from copy import copy

from django.test import TestCase
from django.db import transaction
from django.core.exceptions import ValidationError

from club.models import Club
from test_data.club_data import ClubDataProvider

class ClubTestCase(TestCase):
    """ This is the unit test case for Club model.
    """
    def __init__(self, *args, **kwargs):
        super(ClubTestCase, self).__init__(*args, **kwargs)

        data_prov = ClubDataProvider()
        self.entity1 = data_prov.get_entity1()
        self.entity2 = data_prov.get_entity2()

    def test_CRUD(self):
        """ Test CRUD functions of the Club model.
        """
        entity1 = self.entity1

        entity1.save()
        self.assertIsNotNone(entity1.id)

        savedEntity = Club.objects.get(pk=entity1.id)
        self.assertIsNotNone(savedEntity)
        self.assertIsNotNone(savedEntity.ref)

        entity1.name = "Awesome tennis club"
        entity1.save()
        updatedEntity = Club.objects.get(pk=entity1.id)
        self.assertEqual(entity1.name, "Awesome tennis club")

        entity1.delete()
        with self.assertRaises(Club.DoesNotExist):
            Club.objects.get(pk=entity1.id)

        transaction.rollback()

    # NOT NULL constraints.

    def test_name_not_null(self):
        """ Tests NOT NULL constraint of name.
        """
        buffer = copy(self.entity1)
        buffer.name = None
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    def test_description_not_null(self):
        """ Tests NOT NULL constraint of description.
        """
        buffer = copy(self.entity1)
        buffer.description = None
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    def test_url_not_null(self):
        """ Tests NOT NULL constraint of url.
        """
        buffer = copy(self.entity1)
        buffer.url = None
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

    def test_email_not_null(self):
        """ Tests NOT NULL constraint of email.
        """
        buffer = copy(self.entity1)
        buffer.email = None
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    def test_primary_phone_not_null(self):
        """ Tests NOT NULL constraint of primary_phone.
        """
        buffer = copy(self.entity1)
        buffer.primary_phone = None
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    # CHECK constraints.

    def test_status_value(self):
        """ Tests CHECK constraint of status.
        """
        buffer = copy(self.entity1)
        buffer.status = "9"
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    def test_email_value(self):
        """ Tests CHECK constraint of email.
        """
        buffer = copy(self.entity1)
        buffer.email = "what a bad email"
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    # UNIQUE constraints.

    def test_url_unique(self):
        """ Tests UNIQUE constraint of url.
        """
        self.entity1.save()
        self.entity2.url = self.entity1.url

        with self.assertRaises(ValidationError):
            self.entity2.save()

        transaction.rollback()
