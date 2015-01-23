from club.models import GeneralRule

class GeneralRuleDataProvider:
    """ This class provides data for testing GeneralRule model.
    """
    def get_entity1(self):
        entity1 = GeneralRule()
        entity1.name = "MAXPLAYER"
        entity1.value = "4"

        return entity1

    def get_entity2(self):
        entity2 = GeneralRule()
        entity2.name = "MAXDURATION"
        entity2.value = "4 hours"

        return entity2
