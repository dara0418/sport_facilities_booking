from abc import ABCMeta, abstractmethod

from django.test import TestCase

from core.models import *

class BaseTestCase(TestCase):
    """ This is the base test class for all tests.

    This class is abstract. It's responsible for setting up the testing environment before any
    unit tests execute, and clean up the database after all unit tests executed.

    Attributes:
      entity1 (Object): The first entity provided by DataProvider.
      entity2 (Object): The second entity provided by DataProvider.
    """
    __metaclass__ = ABCMeta

    entity1 = None
    entity2 = None

    @abstractmethod
    def get_data_prov(self):
        """ This abstract method returns an instance of subclass of DataProvider.
        """
        pass

    def setUp(self):
        """ This function sets up testing environment.

        It pre-inserts some objects into database.
        """
        self.entity1 = self.get_data_prov().get_entity1()
        self.entity2 = self.get_data_prov().get_entity2()

    def tearDown(self):
        """ This function cleans up the database finally.

        It cleans up all tables to make the database returning to original states. However the
        sequence indexes won't be reset. So you should avoid to explicitly use an exact ID value
        in your tests.
        """
        Address.objects.all().delete()      # Clean up Address model.
