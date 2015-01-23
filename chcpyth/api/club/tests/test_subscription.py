from copy import copy
from datetime import datetime

from django.test import TestCase
from django.db import transaction
from django.core.exceptions import ValidationError

from core.models import SubscriptionPlan
from club.models import Club, Subscription
from test_data.club_data import ClubDataProvider
from test_data.subscription_plan_data import SubscriptionPlanDataProvider
from test_data.subscription_data import SubscriptionDataProvider

class SubscriptionTestCase(TestCase):
    """ This is the unit test case for Subscription model.
    """
    def __init__(self, *args, **kwargs):
        super(SubscriptionTestCase, self).__init__(*args, **kwargs)

        data_prov = SubscriptionDataProvider()
        self.entity1 = data_prov.get_entity1()
        self.entity2 = data_prov.get_entity2()

    def setUp(self):
        plan_prov = SubscriptionPlanDataProvider()
        plan1 = plan_prov.get_entity1()
        plan2 = plan_prov.get_entity2()

        plan1.save()
        plan2.save()

        club_prov = ClubDataProvider()
        club1 = club_prov.get_entity1()
        club2 = club_prov.get_entity2()

        club1.save()
        club2.save()

        self.entity1.plan_id = plan1.id
        self.entity1.club_id = club1.id
        self.entity2.plan_id = plan2.id
        self.entity2.club_id = club2.id

    def test_CRUD(self):
        """ Test CRUD functions of the Subscription model.
        """
        entity1 = self.entity1

        entity1.save()
        self.assertIsNotNone(entity1.id)

        savedEntity = Subscription.objects.get(pk=entity1.id)
        self.assertIsNotNone(savedEntity)

        test_date = datetime.strptime("2015-02-02", "%Y-%m-%d").date()
        entity1.expire_date = test_date
        entity1.save()
        updatedEntity = Subscription.objects.get(pk=entity1.id)
        self.assertEqual(entity1.expire_date, test_date)

        entity1.delete()
        with self.assertRaises(Subscription.DoesNotExist):
            Subscription.objects.get(pk=entity1.id)

        transaction.rollback()

    # NOT NULL constants.

    def test_expire_date_not_null(self):
        """ Tests NOT NULL constraint of expire_date.
        """
        buffer = copy(self.entity1)
        buffer.expire_date = None
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

    # CHECK constants.

    def test_status_value(self):
        """ Tests CHECK constraint of status.
        """
        buffer = copy(self.entity1)
        buffer.status = "9"
        with self.assertRaises(ValidationError):
            buffer.save()

        transaction.rollback()

    # FOREIGN KEY constants.

    def test_club_fk(self):
        """ Tests FOREIGN KEY constraint of club.
        """
        self.entity1.club_id = 999

        with self.assertRaises(ValidationError):
            self.entity1.save()

        transaction.rollback()

    def test_plan_fk(self):
        """ Tests FOREIGN KEY constraint of plan.
        """
        self.entity1.plan_id = 999

        with self.assertRaises(ValidationError):
            self.entity1.save()

        transaction.rollback()
