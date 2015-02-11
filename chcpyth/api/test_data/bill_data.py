from club.models import Bill

class BillDataProvider:
    """ This class provides data for testing Bill model.
    """
    def get_entity1(self):
        entity1 = Bill()
        entity1.amount = 1000
        entity1.currency = "USD"
        entity1.status = "P"
        entity1.message = "Payment for subscription."
        entity1.period = "2015"
        entity1.time_unit = "Y"

        return entity1

    def get_entity2(self):
        entity2 = Bill()
        entity2.amount = 500
        entity2.currency = "USD"
        entity2.status = "S"
        entity2.period = "201504"
        entity2.time_unit = "M"

        return entity2
