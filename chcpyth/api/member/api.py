import json

from django.contrib.auth import authenticate, login, logout
from django.conf.urls import url

from tastypie import fields
from tastypie.cache import SimpleCache
from tastypie.utils import trailing_slash
from tastypie.exceptions import Unauthorized, BadRequest

from core.api import BaseResource, AddressResource
from .models import *
from helpers.constants import (
    AUTHENTICATION_FAILED, UNAUTHORIZED_USER, INVALID_PARAMS
)


class MemberResource(BaseResource):
    address = fields.ForeignKey(AddressResource, "address", null=True)

    class Meta(BaseResource.Meta):
        queryset = Member.objects.all()
        resource_name = "member"

    def override_urls(self):
        return [
            url(r"^(?P<resource_name>%s)/login%s$" %
                (self._meta.resource_name, trailing_slash()),
                self.wrap_view("login"), name="api_login"),

            url(r"^(?P<resource_name>%s)/logout%s$" %
                (self._meta.resource_name, trailing_slash()),
                self.wrap_view("logout"), name="api_logout"),

            url(r"^(?P<resource_name>%s)/register%s$" %
                (self._meta.resource_name, trailing_slash()),
                self.wrap_view("register"), name="api_register"),
        ]

    def login(self, request, **kwargs):
        self.method_check(request, allowed=["post"])

        data = json.loads(request.body)

        if "username" in data:
            username = json.loads(request.body)["username"]
        else:
            BadRequest(INVALID_PARAMS)

        if "password" in data:
            password = json.loads(request.body)["password"]
        else:
            BadRequest(INVALID_PARAMS)

        member = authenticate(username=username, password=password)
        if member is not None:
            if member.is_active:
                login(request, member)
                return self.create_response(request, {})
            else:
                raise Unauthorized(USER_INACTIVE)
        else:
            raise Unauthorized(AUTHENTICATION_FAILED)

    def logout(self, request, **kwargs):
        self.method_check(request, allowed=["get"])
        if request.user and request.user.is_authenticated():
            logout(request)
            return self.create_response(request, {})
        else:
            return Unauthorized(UNAUTHORIZED_USER)

    def register(self, request, **kwargs):
        """ This method is for registering a user.

        The default CREATE service is unavailable for creating a user, because the 'password' field is added into the 'excludes' blacklist.
        So here we created a separate register method.

        For register a user, only email and password fields are required. The 'email' parameter could also be 'username'.
        """
        self.method_check(request, allowed=["post"])

        data = json.loads(request.body)

        email = None
        password = None

        if "username" in data:
            email = json.loads(request.body)["username"]
        else:
            if "email" in data:
                email = json.loads(request.body)["email"]
            else:
                BadRequest(INVALID_PARAMS)

        if "password" in data:
            password = json.loads(request.body)["password"]
        else:
            BadRequest(INVALID_PARAMS)

        if email is not None and password is not None:
            member = Member(email=email, password=password)
            member.save()
            return self.create_response(request, {})
        else:
            BadRequest(INVALID_PARAMS)


class MembershipResource(BaseResource):
    from club.api import ClubResource

    member = fields.ForeignKey(MemberResource, "member")
    club = fields.ForeignKey(ClubResource, "club")

    class Meta(BaseResource.Meta):
        queryset = Membership.objects.all()
        resource_name = "membership"


class ClubEventRegistrationResource(BaseResource):
    from club.api import EventResource

    member = fields.ForeignKey(MemberResource, "member")
    event = fields.ForeignKey(EventResource, "event")

    class Meta(BaseResource.Meta):
        queryset = ClubEventRegistration.objects.all()
        resource_name = "club_event_registration"
