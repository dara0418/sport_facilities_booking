(function() {
  'use strict';

  /**
   * Properties defined in this module will be shared among the whole app.
   *
   */
  // TODO - Variables will lose their values if user click refresh button of browser.
  //        Is it better to move these variables to session storage so we can have
  //        long-live data.
  angular.module('app.components.shared_properties', [])

  .service('SharedProperties', sharedPropertiesService);

  sharedPropertiesService.$inject = [];

  function sharedPropertiesService() {
    var service = this;

    service.selectedClub = undefined;
    service.selectedFacility = undefined;

    service.selectedGeneralRule = undefined;
    service.selectedSportRule = undefined;
    service.selectedFacilityRule = undefined;
  }
})();
