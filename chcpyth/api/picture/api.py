from tastypie import fields
from tastypie.cache import SimpleCache
from tastypie.constants import ALL, ALL_WITH_RELATIONS

from core.api import BaseResource
from club.api import ClubResource
from .models import *

class ClubPictureResource(BaseResource):
    club = fields.ForeignKey(ClubResource, "club", full=True)

    class Meta(BaseResource.Meta):
        queryset = ClubPicture.objects.all()
        resource_name = "club_picture"

        # Pull resource by UUID rather than PK.
        filtering = {
            "club": ALL_WITH_RELATIONS,
            "ref": ALL
        }
