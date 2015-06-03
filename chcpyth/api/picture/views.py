import os

from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse
from django.views.generic import View
from django.core.servers.basehttp import FileWrapper

from .models import ClubPicture
from club.models import Club

class ClubPictureView(View):
    def post(self, request, *args, **kwargs):
        """ Upload club picture.
        """
        if request.POST.__contains__("club_ref"):
            club = Club.objects.get(ref=request.POST["club_ref"])

            if club is None:
                # Club not found.
                return HttpResponse(status_code=401)

            file = request.FILES.get("file")

            if file is None:
                return HttpResponse(status_code=400)

            # Create a new ClubPicture entity.
            ClubPicture(
                club=club,
                url=file
            ).save()

            return HttpResponse()
        else:
            # No club UUID given.
            return HttpResponse(status_code=401)
