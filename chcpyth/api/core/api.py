from tastypie.resources import ModelResource
from tastypie.authentication import Authentication
from tastypie.authorization import Authorization
from tastypie.cache import SimpleCache
from tastypie.throttle import BaseThrottle

from .models import Address, SubscriptionPlan


class CHCAuthentication(Authentication):
    pass

class BaseResource(ModelResource):
    class Meta:
        cache = SimpleCache(timeout=10)

        excludes = ["id", "password", "is_staff", "is_superuser"]

        authentication = CHCAuthentication()

        # Null authorization by default.
        authorization = Authorization()
        throttle = BaseThrottle(throttle_at=100)

        # Query things by UUID rather than ID.
        detail_uri_name = 'ref'

class AddressResource(BaseResource):
    class Meta(BaseResource.Meta):
        queryset = Address.objects.all()
        resource_name = "address"


class SubscriptionPlanResource(BaseResource):
    class Meta(BaseResource.Meta):
        queryset = SubscriptionPlan.objects.all()
        resource_name = "subscription_plan"
