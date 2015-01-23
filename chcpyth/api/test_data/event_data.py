from datetime import datetime

from club.models import Event

class EventDataProvider:
    """ This class provides data for testing Event model.
    """
    def get_entity1(self):
        entity1 = Event()

        entity1.start = datetime.strptime(
            "2015-02-18 23:59:59",
            "%Y-%m-%d %H:%M:%S"
        )

        entity1.end = datetime.strptime(
            "2015-02-19 23:59:59",
            "%Y-%m-%d %H:%M:%S"
        )

        entity1.name = "Chinese New Year"
        entity1.event_type = "Festival"
        entity1.privacy = "U"
        entity1.content = "Happy Chinese New Year of 2015! \
            Checkout the bulk of special offers!"

        return entity1

    def get_entity2(self):
        entity2 = Event()
        entity2.start = datetime.strptime("2015-03-01", "%Y-%m-%d")
        entity2.end = datetime.strptime("2015-03-31", "%Y-%m-%d")
        entity2.name = "10th Anniversary"
        entity2.event_type = "Event"
        entity2.privacy = "U"
        entity2.content = "Please join us for our 10th anniversary!"

        return entity2
