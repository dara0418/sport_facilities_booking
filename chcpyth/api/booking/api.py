from django.conf.urls import url
from django.db.models import Q

from tastypie import fields
from tastypie.cache import SimpleCache
from tastypie.utils import trailing_slash
from tastypie.constants import ALL, ALL_WITH_RELATIONS

from core.api import BaseResource
from club.api import FacilityResource
from member.api import MemberResource
from .models import *


class BookingResource(BaseResource):
    facility = fields.ForeignKey(FacilityResource, "facility", full=True)

    class Meta(BaseResource.Meta):
        queryset = Booking.objects.all()
        resource_name = "booking"

        filtering = {
            "ref": ALL,
            "facility": ALL_WITH_RELATIONS
        }

    def prepend_urls(self):
        return [
            url(r"^(?P<resource_name>%s)/search_by_facility_and_date%s$" %
                (self._meta.resource_name, trailing_slash()),
                self.wrap_view("search_by_facility_and_date"),
                name="api_search_by_facility_and_date")
        ]

    def search_by_facility_and_date(self, request, **kwargs):
        """ Search bookings by facility ref, start date(include) and end date(include).
        """
        self.method_check(request, allowed=["get"])
        self.throttle_check(request)

        facility_ref = request.GET["facility_ref"]
        start_date = request.GET["start_date"]
        end_date = request.GET["end_date"]

        bookings = Booking.objects.filter(
            Q(facility__ref__exact=facility_ref) &
            Q(booking_date__range=(start_date, end_date))
        ).order_by("booking_date")

        bundles = []

        for booking in bookings:
            bundle = self.build_bundle(obj=booking, request=request)
            bundles.append(self.full_dehydrate(bundle, for_list=True))

        return self.create_response(request, bundles)


class BookingMemberResource(BaseResource):
    booking = fields.ForeignKey(BookingResource, "booking", full=True)
    member = fields.ForeignKey(MemberResource, "member", full=True)

    class Meta(BaseResource.Meta):
        queryset = BookingMember.objects.all()
        resource_name = "booking_member"

        filtering = {
            "ref": ALL,
            "member": ALL_WITH_RELATIONS,
            "booking": ALL_WITH_RELATIONS
        }
