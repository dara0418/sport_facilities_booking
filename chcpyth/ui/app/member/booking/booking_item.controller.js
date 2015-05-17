(function() {
  'use strict';

  angular.module('app.member.booking')

  .controller('MemberBookingItemController', bookingItemController);

  bookingItemController.$inject = ['$scope', '$location', '$translate',
    'Helpers', 'ExceptionHandler', 'SharedProperties'];

  function bookingItemController($scope, $location, $translate,
    Helpers, ExceptionHandler, SharedProperties) {
    var vm = this;

    vm.booking = $scope.booking;
    vm.activate = activate;
    vm.selectBooking = selectBooking;

    var handler = ExceptionHandler;

    vm.activate();

    function activate() {
      // Check if user already signed in.
      Helpers.safeGetLoginMember(vm);

      if ($.isEmptyObject(vm.member)) {
        $location.path('/member/login');
      }

      var address = vm.booking.facility.club.address;
      var addressStr = address.line1 + ' ' + address.line2 + ', ' +
        address.city + ', ' + address.province + ', ' + address.country;
      vm.booking.addressStr = addressStr;
    }

    function selectBooking(booking) {
      SharedProperties.selectedBooking = booking;
    }
  }
})();
