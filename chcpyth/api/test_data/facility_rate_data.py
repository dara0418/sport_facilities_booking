from club.models import FacilityRate

class FacilityRateDataProvider:
    """ This class provides data for testing FacilityRate model.
    """
    def get_entity1(self):
        entity1 = FacilityRate()
        entity1.time_unit = "H"
        entity1.rate = "50"
        entity1.currency = "EUR"

        return entity1

    def get_entity2(self):
        entity2 = FacilityRate()
        entity2.time_unit = "D"
        entity2.rate = "200"
        entity2.currency = "USD"

        return entity2
