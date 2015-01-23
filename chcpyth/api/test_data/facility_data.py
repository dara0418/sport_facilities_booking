from club.models import Facility

class FacilityDataProvider:
    """ This class provides data for testing Facility model.
    """
    def get_entity1(self):
        facility1 = Facility()
        facility1.name = "Tennis court"
        facility1.description = "This is a luxury tennis court."
        facility1.sport_type = "T"
        facility1.status = "A"

        return facility1

    def get_entity2(self):
        facility2 = Facility()
        facility2.name = "Pingpong court"
        facility2.description = "Good court for playing pingpong."
        facility2.sport_type = "G"
        facility2.status = "I"

        return facility2
