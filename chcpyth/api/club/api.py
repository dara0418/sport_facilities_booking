from tastypie import fields
from tastypie.cache import SimpleCache
from tastypie.constants import ALL, ALL_WITH_RELATIONS

from core.api import BaseResource, AddressResource, SubscriptionPlanResource
from .models import *


class ClubResource(BaseResource):
    address = fields.ForeignKey(AddressResource, "address", full=True)

    class Meta(BaseResource.Meta):
        queryset = Club.objects.all()
        resource_name = "club"

        filtering = {
            "ref": ALL,
            "name": ALL
        }


class SubscriptionResource(BaseResource):
    club = fields.ForeignKey(ClubResource, "club", full=True)
    plan = fields.ForeignKey(SubscriptionPlanResource, "plan", full=True)

    class Meta(BaseResource.Meta):
        queryset = Subscription.objects.all()
        resource_name = "subscription"


class FacilityResource(BaseResource):
    club = fields.ForeignKey(ClubResource, "club", full=True)

    class Meta(BaseResource.Meta):
        queryset = Facility.objects.all()
        resource_name = "facility"
        always_return_data = True

        filtering = {
            "ref": ALL,
            "club": ALL_WITH_RELATIONS,
            "name": ALL
        }


class GeneralRuleResource(BaseResource):
    club = fields.ForeignKey(ClubResource, "club", full=True)

    class Meta(BaseResource.Meta):
        queryset = GeneralRule.objects.all()
        resource_name = "general_rule"

        filtering = {
            "ref": ALL,
            "club": ALL_WITH_RELATIONS
        }


class SportRuleResource(BaseResource):
    club = fields.ForeignKey(ClubResource, "club", full=True)

    class Meta(BaseResource.Meta):
        queryset = SportRule.objects.all()
        resource_name = "sport_rule"

        filtering = {
            "ref": ALL,
            "club": ALL_WITH_RELATIONS
        }


class FacilityRuleResource(BaseResource):
    facility = fields.ForeignKey(FacilityResource, "facility", full=True)

    class Meta(BaseResource.Meta):
        queryset = FacilityRule.objects.all()
        resource_name = "facility_rule"

        filtering = {
            "ref": ALL,
            "facility": ALL_WITH_RELATIONS
        }


class EventResource(BaseResource):
    club = fields.ForeignKey(ClubResource, "club", full=True)

    class Meta(BaseResource.Meta):
        queryset = Event.objects.all()
        resource_name = "event"

        filtering = {
            "club": ALL_WITH_RELATIONS,
            "ref": ALL
        }


class BillResource(BaseResource):
    club = fields.ForeignKey(ClubResource, "club", full=True)

    class Meta(BaseResource.Meta):
        queryset = Bill.objects.all()
        resource_name = "bill"

        filtering = {
            "club": ALL_WITH_RELATIONS,
            "ref": ALL
        }


class MembershipRequestResource(BaseResource):
    from member.api import MemberResource

    club = fields.ForeignKey(ClubResource, "club", full=True)
    member = fields.ForeignKey(MemberResource, "member", full=True)

    class Meta(BaseResource.Meta):
        queryset = MembershipRequest.objects.all()
        resource_name = "membership_request"

        filtering = {
            "ref": ALL,
            "club": ALL_WITH_RELATIONS,
            "member": ALL_WITH_RELATIONS,
            "status": ALL
        }


class ClubRateResource(BaseResource):
    club = fields.ForeignKey(ClubResource, "club", full=True)

    class Meta(BaseResource.Meta):
        queryset = ClubRate.objects.all()
        resource_name = "club_rate"

        filtering = {
            "ref": ALL,
            "club": ALL_WITH_RELATIONS,
            "name": ALL
        }


class FacilityRateResource(BaseResource):
    facility = fields.ForeignKey(FacilityResource, "facility", full=True)

    class Meta(BaseResource.Meta):
        queryset = FacilityRate.objects.all()
        resource_name = "facility_rate"

        filtering = {
            "ref": ALL,
            "facility": ALL_WITH_RELATIONS,
            "name": ALL
        }
