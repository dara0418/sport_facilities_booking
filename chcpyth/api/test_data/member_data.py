from datetime import datetime

from member.models import Member

class MemberDataProvider:
    """ This class provides data for testing Member model.
    """
    def get_entity1(self):
        entity1 = Member()
        entity1.title = "MR"
        entity1.gender = "M"
        entity1.first_name = "Cool"
        entity1.last_name = "Man"
        entity1.dob = datetime.strptime("1900-01-01", "%Y-%m-%d").date()
        entity1.avatar = "my_awesome_picture.jpg"
        entity1.email = "cool.man@gmail.com"
        entity1.landline = "1000000000"
        entity1.password = "1111111111"

        return entity1

    def get_entity2(self):
        entity2 = Member()
        entity2.email = "simple.man@gmail.com"
        entity2.password = "1111111111"

        return entity2
