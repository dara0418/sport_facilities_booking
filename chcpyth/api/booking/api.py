from tastypie import fields
from tastypie.cache import SimpleCache

from core.api import BaseResource
from club.api import FacilityResource
from member.api import MemberResource
from .models import *


class BookingResource(BaseResource):
    facility = fields.ForeignKey(FacilityResource, "facility")

    class Meta(BaseResource.Meta):
        queryset = Booking.objects.all()
        resource_name = "booking"


class BookingMemberResource(BaseResource):
    booking = fields.ForeignKey(BookingResource, "booking")
    member = fields.ForeignKey(MemberResource, "member")

    class Meta(BaseResource.Meta):
        queryset = BookingMember.objects.all()
        resource_name = "booking_member"
