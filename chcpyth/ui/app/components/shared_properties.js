(function() {
  'use strict';

  /**
   * Properties defined in this module will be shared among the whole app.
   */
  // TODO - These variables should be migrated to the storage module to keep
  //        persistent.
  angular.module('app.components.shared_properties', [])

  .service('SharedProperties', sharedPropertiesService);

  sharedPropertiesService.$inject = [];

  function sharedPropertiesService() {
    var service = this;

    service.selectedFacility = undefined;

    service.selectedGeneralRule = undefined;
    service.selectedSportRule = undefined;
    service.selectedFacilityRule = undefined;
  }
})();
