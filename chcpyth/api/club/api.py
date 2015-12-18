from django.conf.urls import url
from django.db.models import Q

from tastypie import fields
from tastypie.cache import SimpleCache
from tastypie.utils import trailing_slash
from tastypie.constants import ALL, ALL_WITH_RELATIONS

from fuzzywuzzy import fuzz

from core.api import BaseResource, AddressResource, SubscriptionPlanResource
from .models import *
from helpers.constants import ACTIVE


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

    def prepend_urls(self):
        return [
            url(r"^(?P<resource_name>%s)/search_by_type%s$" %
                (self._meta.resource_name, trailing_slash()),
                self.wrap_view("search_by_type"),
                name="api_search_by_type")
        ]

    def search_by_type(self, request, **kwargs):
        """ Search facility by sport type, location and date.
        """
        self.method_check(request, allowed=["get"])
        self.throttle_check(request)

        keyword = request.GET["keyword"]
        location = request.GET["location"]
        country = request.GET["country"]

        # Replace the delimiters with spaces.
        cleanLocation = location.replace(",", " ")

        # Get all facilities of this country for fuzzy matching.
        # Initially we can do this because there are not that many facilities in our DB.
        # Later we could refine the query.
        facilities = Facility.objects.filter(
            Q(sport_type__iexact=keyword) &
            Q(club__address__country__iexact=country) &
            Q(status__exact=ACTIVE)
        )

        bundles = []

        for facility in facilities:
            addr = facility.club.address
            addrStr = "%s %s %s %s" % (addr.line1, addr.line2, addr.city, addr.province)

            # Fuzzy matching.
            ratio = fuzz.token_set_ratio(cleanLocation, addrStr)

            # TODO - Check which ratio is the best.
            if ratio > 30:
                bundle = self.build_bundle(obj=facility, request=request)
                bundles.append(self.full_dehydrate(bundle, for_list=True))

        return self.create_response(request, bundles)



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
