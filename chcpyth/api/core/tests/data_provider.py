from abc import ABCMeta, abstractmethod

class DataProvider:
    """ This class provides test data for both unit and integration tests.

    Basically it provides two entities for testing business logics and CRUD functions. This class
    is abstract.

    However two entities may be not enough for testing some special models. You could define more
    entities in its sub classes.
    """
    __metaclass__ = ABCMeta

    @abstractmethod
    def get_entity1(self):
        """ This method produces the first entity.
        """
        pass

    @abstractmethod
    def get_entity2(self):
        """ This method produces the second entity.
        """
        pass
