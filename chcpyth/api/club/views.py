from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse
from django.views.generic import View

from .models import Bill

# Create your views here.
class BillPayment(View):
    def post(self, request, *args, **kwargs):
        """ Upload member avatars.
        """
        print request

        return HttpResponse("post")

    def get(self, request, *args, **kwargs):
        """ Upload member avatars.
        """
        print request

        return HttpResponse("get")
