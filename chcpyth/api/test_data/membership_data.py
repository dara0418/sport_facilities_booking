from member.models import Membership

class MembershipDataProvider:
    """ This class provides data for testing Membership model.
    """
    def get_entity1(self):
        entity1 = Membership()
        entity1.role = "A"

        return entity1

    def get_entity2(self):
        entity2 = Membership()
        entity2.role = "M"

        return entity2
