from django.conf.urls import patterns, url

from .views import upload_avatar

urlpatterns = patterns('',
    url("member/uploadAvatar", upload_avatar)
)
