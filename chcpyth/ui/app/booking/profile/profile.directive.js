(function() {
  'use strict';

  angular.module('app.booking.profile')

  .directive('bookingProfile', bookingProfile);

  function bookingProfile() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/booking/profile/profile.html',
      controller: 'BookingProfileController',
      controllerAs: 'vm',
      scope: {
        booking: '='
      }
    };

    return directive;
  }
})();
