from datetime import datetime

from club.models import Subscription

class SubscriptionDataProvider:
    """ This class provides data for testing Subscription model.
    """
    def get_entity1(self):
        subscription = Subscription()
        subscription.expire_date = datetime.strptime("2015-03-06", "%Y-%m-%d").date()
        subscription.status = "A"

        return subscription

    def get_entity2(self):
        subscription = Subscription()
        subscription.expire_date = datetime.strptime("2015-06-08", "%Y-%m-%d").date()
        subscription.status = "I"

        return subscription
