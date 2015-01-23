from club.models import FacilityRule

class FacilityRuleDataProvider:
    """ This class provides data for testing FacilityRule model.
    """
    def get_entity1(self):
        entity1 = FacilityRule()
        entity1.name = "MAXPLAYER"
        entity1.value = "4"

        return entity1

    def get_entity2(self):
        entity2 = FacilityRule()
        entity2.name = "MAXDURATION"
        entity2.value = "4 hours"

        return entity2
