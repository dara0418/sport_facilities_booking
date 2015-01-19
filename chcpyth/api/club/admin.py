from django.contrib import admin

from club.models import *

admin.site.register(Club)
admin.site.register(Subscription)
admin.site.register(Facility)
admin.site.register(GeneralRule)
admin.site.register(SportRule)
admin.site.register(Event)
admin.site.register(Payment)
admin.site.register(MembershipRequest)
admin.site.register(ClubRate)
