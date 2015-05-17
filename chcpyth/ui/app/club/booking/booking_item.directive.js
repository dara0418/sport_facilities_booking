(function() {
  'use strict';

  angular.module('app.club.booking')

  .directive('clubBookingItem', clubBookingItem);

  function clubBookingItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/club/booking/booking_item.html',
      controller: 'ClubBookingItemController',
      controllerAs: 'vm',
      scope: {
        booking: '='
      }
    };

    return directive;
  }
})();
