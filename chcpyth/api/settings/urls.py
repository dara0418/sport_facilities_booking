from django.conf.urls import patterns, include, url

from django.contrib import admin

from tastypie.api import Api

from core.api import *
from club.api import *
from member.api import *
from booking.api import *
from picture.api import *

from member.views import MemberAvatar
from picture.views import ClubPictureView
from club.views import BillPayment

admin.autodiscover()

api = Api(api_name="v1")

# Core API.
api.register(AddressResource())
api.register(SubscriptionPlanResource())

# Club API.
api.register(ClubResource())
api.register(SubscriptionResource())
api.register(FacilityResource())
api.register(GeneralRuleResource())
api.register(SportRuleResource())
api.register(FacilityRuleResource())
api.register(EventResource())
api.register(BillResource())
api.register(MembershipRequestResource())
api.register(ClubRateResource())
api.register(FacilityRateResource())

# Member API.
api.register(MemberResource())
api.register(MembershipResource())
api.register(ClubEventRegistrationResource())

# Booking API.
api.register(BookingResource())
api.register(BookingMemberResource())

# Picture API.
api.register(ClubPictureResource())

urlpatterns = patterns("",
    url("api/member/avatar", MemberAvatar.as_view(), name="member_avatar"),
    url("api/picture/club", ClubPictureView.as_view(), name="club_picture"),
    url("api/club/bill/payment", BillPayment.as_view(), name="bill_payment"),
    url(r"^admin/", include(admin.site.urls)),
    url(r"^api/", include(api.urls)),
)
