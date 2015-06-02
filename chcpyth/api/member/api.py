import json

from django.contrib.auth import authenticate, login, logout, hashers
from django.conf.urls import url

from tastypie import fields
from tastypie.cache import SimpleCache
from tastypie.utils import trailing_slash
from tastypie.exceptions import Unauthorized, BadRequest
from tastypie.serializers import Serializer
from tastypie.constants import ALL, ALL_WITH_RELATIONS

from core.api import BaseResource, AddressResource
from .models import *
from helpers.constants import (
    AUTHENTICATION_FAILED, UNAUTHORIZED_USER, INVALID_PARAMS
)
from helpers.utils import to_json


class MemberResource(BaseResource):
    address = fields.ForeignKey(AddressResource, "address", null=True, full=True)
    avatar = fields.FileField(attribute='avatar', null=True, blank=True)

    class Meta(BaseResource.Meta):
        queryset = Member.objects.all()
        resource_name = "member"
        serializer = Serializer()

        # Pull resource by UUID rather than PK.
        filtering = {
            "username": ALL,
            "email": ALL,
            "ref": ALL
        }

    def prepend_urls(self):
        return [
            url(r"^(?P<resource_name>%s)/login%s$" %
                (self._meta.resource_name, trailing_slash()),
                self.wrap_view("login"),
                name="api_login"),

            url(r"^(?P<resource_name>%s)/logout%s$" %
                (self._meta.resource_name, trailing_slash()),
                self.wrap_view("logout"),
                name="api_logout"),

            url(r"^(?P<resource_name>%s)/register%s$" %
                (self._meta.resource_name, trailing_slash()),
                self.wrap_view("register"),
                name="api_register"),

            url(r"^(?P<resource_name>%s)/change_password%s$" %
                (self._meta.resource_name, trailing_slash()),
                self.wrap_view("change_password"),
                name="api_change_password"),
        ]

    def login(self, request, **kwargs):
        self.method_check(request, allowed=["post"])
        self.throttle_check(request)

        data = json.loads(request.body)

        if "username" in data:
            username = data["username"]
        else:
            BadRequest(INVALID_PARAMS)

        if "password" in data:
            password = data["password"]
        else:
            BadRequest(INVALID_PARAMS)

        member = authenticate(username=username, password=password)

        if member is not None:
            if member.is_active:
                login(request, member)

                # Put the authenticated member into response bundle.
                bundle = self.build_bundle(obj=member, request=request)
                bundle = self.full_dehydrate(bundle)

                return self.create_response(request, bundle)
            else:
                raise Unauthorized(USER_INACTIVE)
        else:
            raise Unauthorized(AUTHENTICATION_FAILED)

    def logout(self, request, **kwargs):
        self.method_check(request, allowed=["get"])
        self.throttle_check(request)

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
        self.throttle_check(request)

        data = json.loads(request.body)

        email = None
        password = None

        if "username" in data:
            email = data["username"]
        else:
            if "email" in data:
                email = data["email"]
            else:
                BadRequest(INVALID_PARAMS)

        if "password" in data:
            password = json.loads(request.body)["password"]
        else:
            BadRequest(INVALID_PARAMS)

        if email is not None and password is not None:
            member = Member(email=email, password=hashers.make_password(password))
            member.save()
            return self.create_response(request, {})
        else:
            BadRequest(INVALID_PARAMS)

    def change_password(self, request, **kwargs):
        """ Change password of member.
        """
        self.method_check(request, allowed=['post'])
        self.throttle_check(request)

        data = json.loads(request.body)

        username = None
        old_password = None
        new_password = None

        if "username" in data:
            username = data["username"]
            print username
        else:
            if "email" in data:
                username = data["email"]
            else:
                BadRequest(INVALID_PARAMS)

        if "old_password" in data:
            old_password = data["old_password"]
        else:
            BadRequest(INVALID_PARAMS)

        if "new_password" in data:
            new_password = data["new_password"]
        else:
            BadRequest(INVALID_PARAMS)

        if (old_password is not None and new_password is not None and
            username is not None):
            member = authenticate(username=username, password=old_password)

            if member is not None:
                member.set_password(new_password)
                member.save()
                return self.create_response(request, {})

class MembershipResource(BaseResource):
    from club.api import ClubResource

    member = fields.ForeignKey(MemberResource, "member", full=True)
    club = fields.ForeignKey(ClubResource, "club", full=True)

    class Meta(BaseResource.Meta):
        queryset = Membership.objects.all()
        resource_name = "membership"

        filtering = {
            "ref": ALL,
            "member": ALL_WITH_RELATIONS,
            "club": ALL_WITH_RELATIONS
        }


class ClubEventRegistrationResource(BaseResource):
    from club.api import EventResource

    member = fields.ForeignKey(MemberResource, "member", full=True)
    event = fields.ForeignKey(EventResource, "event", full=True)

    class Meta(BaseResource.Meta):
        queryset = ClubEventRegistration.objects.all()
        resource_name = "club_event_registration"

        filtering = {
            "ref": ALL,
            "member": ALL_WITH_RELATIONS,
            "event": ALL_WITH_RELATIONS
        }
