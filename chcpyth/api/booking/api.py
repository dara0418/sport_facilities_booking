from tastypie import fields
from tastypie.cache import SimpleCache
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
            "facility": ALL_WITH_RELATIONS,
        }


class BookingMemberResource(BaseResource):
    booking = fields.ForeignKey(BookingResource, "booking", full=True)
    member = fields.ForeignKey(MemberResource, "member", full=True)

    class Meta(BaseResource.Meta):
        queryset = BookingMember.objects.all()
        resource_name = "booking_member"

        filtering = {
            "ref": ALL,
            "member": ALL_WITH_RELATIONS,
            "booking": ALL_WITH_RELATIONS,
        }
