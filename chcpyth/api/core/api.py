from tastypie.resources import ModelResource
from tastypie.authentication import BasicAuthentication
from tastypie.authorization import Authorization
from tastypie.cache import SimpleCache
from tastypie.serializers import Serializer

from .models import Address, SubscriptionPlan


class CHCAuthentication(BasicAuthentication):
    pass

class BaseResource(ModelResource):
    class Meta:
        cache = SimpleCache(timeout=10)

        excludes = ["id", "password", "is_active", "is_staff", "is_superuser"]

        authentication = CHCAuthentication()

        # Null authorization by default.
        authorization = Authorization()

class AddressResource(BaseResource):
    class Meta(BaseResource.Meta):
        queryset = Address.objects.all()
        resource_name = "address"


class SubscriptionPlanResource(BaseResource):
    class Meta(BaseResource.Meta):
        queryset = SubscriptionPlan.objects.all()
        resource_name = "subscription_plan"
