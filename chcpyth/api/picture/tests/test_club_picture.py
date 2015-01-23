from copy import copy

from django.test import TestCase
from django.db import transaction
from django.core.exceptions import ValidationError

from picture.models import ClubPicture
from test_data.club_data import ClubDataProvider
from test_data.club_picture_data import ClubPictureDataProvider

class ClubPictureTestCase(TestCase):
    """ This is the unit test case for ClubPicture model.
    """
    def __init__(self, *args, **kwargs):
        super(ClubPictureTestCase, self).__init__(*args, **kwargs)

        data_prov = ClubPictureDataProvider()
        self.entity1 = data_prov.get_entity1()
        self.entity2 = data_prov.get_entity2()

    def setUp(self):
        club_prov = ClubDataProvider()
        club1 = club_prov.get_entity1()
        club2 = club_prov.get_entity2()

        club1.save()
        club2.save()

        self.entity1.club_id = club1.id
        self.entity2.club_id = club2.id

    def test_CRUD(self):
        """ Test CRUD functions of the ClubPicture model.
        """
        entity1 = self.entity1

        entity1.save()
        self.assertIsNotNone(entity1.id)

        savedEntity = ClubPicture.objects.get(pk=entity1.id)
        self.assertIsNotNone(savedEntity)

        entity1.url = "another_picture.png"
        entity1.save()
        updatedEntity = ClubPicture(pk=entity1.id)
        self.assertEqual(entity1.url, "another_picture.png")

        entity1.delete()
        with self.assertRaises(ClubPicture.DoesNotExist):
            ClubPicture.objects.get(pk=entity1.id)

        transaction.rollback()

    # NOT NULL constraints.

    def test_url_not_null(self):
        """ Tests NOT NULL constraint of url.
        """
        buffer = copy(self.entity1)
        buffer.url = None
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
