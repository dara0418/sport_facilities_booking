from club.models import MembershipRequest

class MembershipRequestDataProvider:
    """ This class provides data for testing MembershipRequest model.
    """
    def get_entity1(self):
        entity1 = MembershipRequest()
        entity1.request_type = "MR"
        entity1.status = "P"
        entity1.content = "May I join your club?"

        return entity1

    def get_entity2(self):
        entity2 = MembershipRequest()
        entity2.request_type = "CI"
        entity2.status = "A"
        entity2.content = "Please join our club."

        return entity2
