(function() {
  'use strict';

  angular.module('app.booking.dashboard')

  .controller('BookingDashboardController', controller);

  controller.$inject = ['$scope', 'Notification', '$translate', 'Club',
    'Helpers', 'Storage', 'Membership', '$location', 'ExceptionHandler',
    'Booking'];

  function controller($scope, Notification, $translate, Club,
    Helpers, Storage, Membership, $location, ExceptionHandler,
    Booking) {
    var vm = this;

    var handler = ExceptionHandler;

    vm.activate = activate;
    vm.s = Storage;

    vm.activate();

    // The startup function.
    function activate() {
      Helpers.safeGetLoginMember(vm);
    }
  }
})();
