from django.contrib import admin

from member.models import *

admin.site.register(Member)
admin.site.register(Membership)
admin.site.register(ClubEventRegistration)
