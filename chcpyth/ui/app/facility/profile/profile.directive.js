(function() {
  'use strict';

  angular.module('app.facility.profile')

  .directive('facilityProfile', facilityProfile);

  function facilityProfile() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/facility/profile/profile.html',
      controller: 'FacilityProfileController',
      controllerAs: 'vm',
      scope: {}
    };

    return directive;
  }
})();
