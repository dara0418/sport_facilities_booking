from django.db import models

from core.models import BaseModel

class ClubPicture(BaseModel):
    """ This model contains picture a URL of club.

    Attributes:
      id (AutoField): The auto increment ID of club picture.
      club (ForeignKey): This field references the 'club.Club' model.
      url (CharField): The URL pointing to location of picture. This could be a relative path.
    """
    id = models.AutoField(primary_key=True)
    club = models.ForeignKey('club.Club')
    url = models.CharField(max_length=255)
