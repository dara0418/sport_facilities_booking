from copy import copy

from django.test import TestCase
from django.db import transaction
from django.core.exceptions import ValidationError

from club.models import FacilityRule
from test_data.club_data import ClubDataProvider
from test_data.facility_data import FacilityDataProvider
from test_data.facility_rule_data import FacilityRuleDataProvider
from test_base import FacilityTestBase

class FacilityRuleTestCase(FacilityTestBase):
    """ This is the unit test case for FacilityRule model.
    """
    def __init__(self, *args, **kwargs):
        super(FacilityRuleTestCase, self).__init__(*args, **kwargs)

        data_prov = FacilityRuleDataProvider()
        self.entity1 = data_prov.get_entity1()
        self.entity2 = data_prov.get_entity2()

    def test_CRUD(self):
        """ Test CRUD functions of the FacilityRule model.
        """
        entity1 = self.entity1

        entity1.save()
        self.assertIsNotNone(entity1.id)

        savedEntity = FacilityRule.objects.get(pk=entity1.id)
        self.assertIsNotNone(savedEntity)

        entity1.value = "ENDLESS"
        entity1.save()
        updatedEntity = FacilityRule(pk=entity1.id)
        self.assertEqual(entity1.value, "ENDLESS")

        entity1.delete()
        with self.assertRaises(FacilityRule.DoesNotExist):
            FacilityRule.objects.get(pk=entity1.id)

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

    def test_facility_fk(self):
        """ Tests FOREIGN KEY constraint of facility.
        """
        self.entity1.facility_id = 999

        with self.assertRaises(ValidationError):
            self.entity1.save()

        transaction.rollback()
