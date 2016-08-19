from tastypie import fields
from tastypie.cache import SimpleCache

from core.api import BaseResource, AddressResource, SubscriptionPlanResource
from .models import *


class ClubResource(BaseResource):
    address = fields.ForeignKey(AddressResource, "address")

    class Meta(BaseResource.Meta):
        queryset = Club.objects.all()
        resource_name = "club"


class SubscriptionResource(BaseResource):
    club = fields.ForeignKey(ClubResource, "club")
    plan = fields.ForeignKey(SubscriptionPlanResource, "plan")

    class Meta(BaseResource.Meta):
        queryset = Subscription.objects.all()
        resource_name = "subscription"


class FacilityResource(BaseResource):
    club = fields.ForeignKey(ClubResource, "club")

    class Meta(BaseResource.Meta):
        queryset = Facility.objects.all()
        resource_name = "facility"


class GeneralRuleResource(BaseResource):
    club = fields.ForeignKey(ClubResource, "club")

    class Meta(BaseResource.Meta):
        queryset = GeneralRule.objects.all()
        resource_name = "general_rule"


class SportRuleResource(BaseResource):
    club = fields.ForeignKey(ClubResource, "club")

    class Meta(BaseResource.Meta):
        queryset = SportRule.objects.all()
        resource_name = "sport_rule"


class FacilityRuleResource(BaseResource):
    facility = fields.ForeignKey(FacilityResource, "facility")

    class Meta(BaseResource.Meta):
        queryset = FacilityRule.objects.all()
        resource_name = "facility_rule"


class EventResource(BaseResource):
    club = fields.ForeignKey(ClubResource, "club")

    class Meta(BaseResource.Meta):
        queryset = Event.objects.all()
        resource_name = "event"


class BillResource(BaseResource):
    club = fields.ForeignKey(ClubResource, "club")

    class Meta(BaseResource.Meta):
        queryset = Bill.objects.all()
        resource_name = "bill"


class MembershipRequestResource(BaseResource):
    from member.api import MemberResource

    club = fields.ForeignKey(ClubResource, "club")
    member = fields.ForeignKey(MemberResource, "member")

    class Meta(BaseResource.Meta):
        queryset = MembershipRequest.objects.all()
        resource_name = "membership_request"


class ClubRateResource(BaseResource):
    club = fields.ForeignKey(ClubResource, "club")

    class Meta(BaseResource.Meta):
        queryset = ClubRate.objects.all()
        resource_name = "club_rate"


class FacilityRateResource(BaseResource):
    facility = fields.ForeignKey(FacilityResource, "facility")

    class Meta(BaseResource.Meta):
        queryset = FacilityRate.objects.all()
        resource_name = "facility_rate"
