from core.models import SubscriptionPlan

class SubscriptionPlanDataProvider:
    """ This class provides data for testing SubscriptionPlan model.
    """
    def get_entity1(self):
        plan = SubscriptionPlan()
        plan.name = "Bronze"
        plan.frequency = "MY"
        plan.rate = 100
        plan.currency = "USD"
        plan.level = "B"

        return plan

    def get_entity2(self):
        plan = SubscriptionPlan()
        plan.name = "Silver"
        plan.frequency = "MY"
        plan.rate = 150
        plan.currency = "USD"
        plan.level = "S"

        return plan
