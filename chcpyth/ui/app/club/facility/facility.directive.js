(function() {
  'use strict';

  angular.module('app.club.facility')

  .directive('clubFacility', clubFacility);

  function clubFacility() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/club/facility/facility.html',
      controller: 'ClubFacilityController',
      controllerAs: 'vm',
      scope: {
        club: '='
      }
    };

    return directive;
  }
})();
