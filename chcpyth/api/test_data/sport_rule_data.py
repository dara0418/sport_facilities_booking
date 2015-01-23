from club.models import SportRule

class SportRuleDataProvider:
    """ This class provides data for testing SportRule model.
    """
    def get_entity1(self):
        entity1 = SportRule()
        entity1.name = "MAXPLAYER"
        entity1.value = "4"
        entity1.sport_type = "T"

        return entity1

    def get_entity2(self):
        entity2 = SportRule()
        entity2.name = "MAXDURATION"
        entity2.value = "4 hours"
        entity2.sport_type = "G"

        return entity2
