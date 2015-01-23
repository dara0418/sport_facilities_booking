from club.models import ClubRate

class ClubRateDataProvider:
    """ This class provides data for testing ClubRate model.
    """
    def get_entity1(self):
        entity1 = ClubRate()
        entity1.sport_type = "T"
        entity1.time_unit = "H"
        entity1.rate = "50"
        entity1.currency = "EUR"

        return entity1

    def get_entity2(self):
        entity2 = ClubRate()
        entity2.sport_type = "D"
        entity2.time_unit = "D"
        entity2.rate = "200"
        entity2.currency = "USD"

        return entity2
