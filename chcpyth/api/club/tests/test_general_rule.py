from copy import copy

from django.test import TestCase
from django.db import transaction
from django.core.exceptions import ValidationError

from club.models import GeneralRule
from test_data.club_data import ClubDataProvider
from test_data.general_rule_data import GeneralRuleDataProvider
from test_base import ClubTestBase

class GeneralRuleTestCase(ClubTestBase):
    """ This is the unit test case for GeneralRule model.
    """
    def __init__(self, *args, **kwargs):
        super(GeneralRuleTestCase, self).__init__(*args, **kwargs)

        data_prov = GeneralRuleDataProvider()
        self.entity1 = data_prov.get_entity1()
        self.entity2 = data_prov.get_entity2()

    def test_CRUD(self):
        """ Test CRUD functions of the GeneralRule model.
        """
        entity1 = self.entity1

        entity1.save()
        self.assertIsNotNone(entity1.id)

        savedEntity = GeneralRule.objects.get(pk=entity1.id)
        self.assertIsNotNone(savedEntity)

        entity1.name = "MEGA RULE"
        entity1.save()
        updatedEntity = GeneralRule(pk=entity1.id)
        self.assertEqual(entity1.name, "MEGA RULE")

        entity1.delete()
        with self.assertRaises(GeneralRule.DoesNotExist):
            GeneralRule.objects.get(pk=entity1.id)

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

    # FOREIGN KEY constraints.

    def test_club_fk(self):
        """ Tests FOREIGN KEY constraint of club.
        """
        self.entity1.club_id = 999

        with self.assertRaises(ValidationError):
            self.entity1.save()

        transaction.rollback()
