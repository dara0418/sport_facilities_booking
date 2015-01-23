from copy import copy

from django.test import TestCase
from django.db import transaction
from django.core.exceptions import ValidationError

from core.models import SubscriptionPlan
from test_data.subscription_plan_data import SubscriptionPlanDataProvider

class SubscriptionPlanTestCase(TestCase):
    """ This is the unit test case for SubscriptionPlanDataProvider model.
    """
    def __init__(self, *args, **kwargs):
        super(SubscriptionPlanTestCase, self).__init__(*args, **kwargs)

        data_prov = SubscriptionPlanDataProvider()
        self.entity1 = data_prov.get_entity1()
        self.entity2 = data_prov.get_entity2()

    def test_CRUD(self):
        """ Tests the CRUD operations of SubscriptionPlan.
        """
        entity1 = self.entity1

        entity1.save()
        self.assertIsNotNone(entity1.id)

        savedEntity = SubscriptionPlan.objects.get(pk=entity1.id)
        self.assertIsNotNone(savedEntity)

        entity1.name = "AWESOME PLAN"
        entity1.save()
        updatedEntity = SubscriptionPlan.objects.get(pk=entity1.id)
        self.assertEqual(entity1.name, "AWESOME PLAN")

        entity1.delete()
        with self.assertRaises(SubscriptionPlan.DoesNotExist):
            SubscriptionPlan.objects.get(pk=entity1.id)

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

    def test_frequency_not_null(self):
        """ Tests NOT NULL constraint of frequency.
        """
        buffer = copy(self.entity1)
        buffer.frequency = None
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    def test_rate_not_null(self):
        """ Tests NOT NULL constraint of rate.
        """
        buffer = copy(self.entity1)
        buffer.rate = None
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    def test_currency_not_null(self):
        """ Tests NOT NULL constraint of currency.
        """
        buffer = copy(self.entity1)
        buffer.currency = None
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    def test_level_not_null(self):
        """ Tests NOT NULL constraint of level.
        """
        buffer = copy(self.entity1)
        buffer.level = None
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    # CHECK constraints.

    def test_frequancy_value(self):
        """ Tests CHECK constraint of frequency.
        """
        buffer = copy(self.entity1)
        buffer.frequency = "XX"
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    def test_level_value(self):
        """ Test CHECK constraint of level.
        """
        buffer = copy(self.entity1)
        buffer.level = "A"
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    # UNIQUE constraints.

    def test_name_unique(self):
        """ Tests UNIQUE constraint of name.
        """
        self.entity1.save()
        self.entity2.name = self.entity1.name

        with self.assertRaises(ValidationError):
            self.entity2.save()

        transaction.rollback()
