(function() {
  'use strict';

  angular.module('app.club.facility')

  .directive('clubFacilityItem', clubFacilityItem);

  function clubFacilityItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/club/facility/facility_item.html',
      controller: 'ClubFacilityItemController',
      controllerAs: 'vm',
      scope: {
        facility: '='
      }
    };

    return directive;
  }
})();
