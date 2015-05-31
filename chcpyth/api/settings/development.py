from .base import *

DEBUG = True

TASTYPIE_FULL_DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'sports_booking',
        'USER': 'test',
        'PASSWORD': 'test',
        'HOST': '127.0.0.1',
        'PORT': '3306'
    }
}

# The base directory to upload any file.
MEDIA_ROOT = "/Users/dara/working/part/club_house_media"
