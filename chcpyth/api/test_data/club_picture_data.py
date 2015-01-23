from picture.models import ClubPicture

class ClubPictureDataProvider:
    """ This class provides data for testing ClubPicture model.
    """
    def get_entity1(self):
        entity1 = ClubPicture()
        entity1.url = "1.jpg"

        return entity1

    def get_entity2(self):
        entity2 = ClubPicture()
        entity2.url = "2.jpg"

        return entity2
