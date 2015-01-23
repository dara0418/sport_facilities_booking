from datetime import datetime

from booking.models import Booking

class BookingDataProvider:
    """ This class provides data for testing Booking model.
    """
    def get_entity1(self):
        entity1 = Booking()
        entity1.booking_date = datetime.strptime("2015-02-01", "%Y-%m-%d")
        entity1.booking_timeslot = "0900"
        entity1.time_unit = "H"
        entity1.duration = 2
        entity1.notes = "Please prepare Tennis rackets for us."
        entity1.num_of_booking = 2
        entity1.rate = 100
        entity1.currency = "USD"

        return entity1

    def get_entity2(self):
        entity2 = Booking()
        entity2.booking_date = datetime.strptime("2015-03-01", "%Y-%m-%d")
        entity2.booking_timeslot = "1400"
        entity2.time_unit = "H"
        entity2.duration = 2
        entity2.num_of_booking = 2
        entity2.rate = 60
        entity2.currency = "EUR"

        return entity2
