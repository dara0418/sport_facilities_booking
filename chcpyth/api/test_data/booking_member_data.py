from booking.models import BookingMember

class BookingMemberDataProvider:
    """ This class provides data for testing BookingMember model.
    """
    def get_entity1(self):
        entity1 = BookingMember()
        entity1.is_booker = True

        return entity1

    def get_entity2(self):
        entity2 = BookingMember()
        entity2.is_booker = True

        return entity2
