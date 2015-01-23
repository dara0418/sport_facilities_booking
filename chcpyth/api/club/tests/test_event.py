from copy import copy

from django.test import TestCase
from django.db import transaction
from django.core.exceptions import ValidationError

from club.models import Event
from test_data.club_data import ClubDataProvider
from test_data.event_data import EventDataProvider
from test_base import ClubTestBase

class EventTestCase(ClubTestBase):
    """ This is the unit test case for Event model.
    """
    def __init__(self, *args, **kwargs):
        super(EventTestCase, self).__init__(*args, **kwargs)

        data_prov = EventDataProvider()
        self.entity1 = data_prov.get_entity1()
        self.entity2 = data_prov.get_entity2()

    def test_CRUD(self):
        """ Test CRUD functions of the Event model.
        """
        entity1 = self.entity1

        entity1.save()
        self.assertIsNotNone(entity1.id)

        savedEntity = Event.objects.get(pk=entity1.id)
        self.assertIsNotNone(savedEntity)

        entity1.privacy = "P"
        entity1.save()
        updatedEntity = Event(pk=entity1.id)
        self.assertEqual(entity1.privacy, "P")

        entity1.delete()
        with self.assertRaises(Event.DoesNotExist):
            Event.objects.get(pk=entity1.id)

        transaction.rollback()

    # NOT NULL constraints.

    def test_start_not_null(self):
        """ Tests NOT NULL constraint of start.
        """
        buffer = copy(self.entity1)
        buffer.start = None
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    def test_end_not_null(self):
        """ Tests NOT NULL constraint of end.
        """
        buffer = copy(self.entity1)
        buffer.end = None
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    def test_name_not_null(self):
        """ Tests NOT NULL constraint of name.
        """
        buffer = copy(self.entity1)
        buffer.name = None
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    def test_event_type_not_null(self):
        """ Tests NOT NULL constraint of event_type.
        """
        buffer = copy(self.entity1)
        buffer.event_type = None
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    def test_privacy_not_null(self):
        """ Tests NOT NULL constraint of privacy.
        """
        buffer = copy(self.entity1)
        buffer.privacy = None
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    def test_content_not_null(self):
        """ Tests NOT NULL constraint of content.
        """
        buffer = copy(self.entity1)
        buffer.content = None
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    # CHECK constraints.

    def test_privacy_value(self):
        """ Tests CHECK constraint of privacy.
        """
        buffer = copy(self.entity1)
        buffer.privacy = "9"
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    # FOREIGN KEY constraints.

    def test_club_fk(self):
        """ Tests FOREIGN KEY constraint of club.
        """
        self.entity1.club_id = 999

        with self.assertRaises(ValidationError):
            self.entity1.save()

        transaction.rollback()
