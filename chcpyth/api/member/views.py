import os

from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse
from django.views.generic import View
from django.core.servers.basehttp import FileWrapper

from .models import Member

# TODO - Restrict access in milestone 3.
# TODO - Shall we restrict the photo download?
class MemberAvatar(View):
    def post(self, request, *args, **kwargs):
        """ Upload member avatars.
        """
        if request.POST.__contains__("member_ref"):
            member = Member.objects.get(ref=request.POST["member_ref"])

            if member is None:
                # Member not found.
                return HttpResponse(status_code=401)
            else:
                file = request.FILES.get("file")

                if file is None:
                    return HttpResponse(status_code=400)

                # Remove old file.
                if member.avatar is not None:
                    try:
                        os.remove(member.avatar.file.name)
                    except IOError:
                        # Ignore if file not exist.
                        pass

                member.avatar = file;
                member.save()

                return HttpResponse()
        else:
            # No member UUID given.
            return HttpResponse(status_code=401)
