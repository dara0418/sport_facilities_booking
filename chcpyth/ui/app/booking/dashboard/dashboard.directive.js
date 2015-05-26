(function() {
  'use strict';

  angular.module('app.booking.dashboard')

  .directive('bookingDashboard', bookingDashboard);

  function bookingDashboard() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/booking/dashboard/dashboard.html',
      controller: 'BookingDashboardController',
      controllerAs: 'vm',
      scope: {}
    };

    return directive;
  }
})();
