(function() {
  'use strict';

  angular.module('app.club.booking')

  .directive('clubBooking', clubBooking);

  function clubBooking() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/club/booking/booking.html',
      controller: 'ClubBookingController',
      controllerAs: 'vm',
      scope: {
        club: '='
      }
    };

    return directive;
  }
})();
