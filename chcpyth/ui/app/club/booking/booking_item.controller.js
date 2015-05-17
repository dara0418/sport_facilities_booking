(function() {
  'use strict';

  angular.module('app.club.booking')

  .controller('ClubBookingItemController', controller);

  controller.$inject = ['$scope', '$location', '$translate',
    'Helpers', 'ExceptionHandler', 'Storage'];

  function controller($scope, $location, $translate,
    Helpers, ExceptionHandler, Storage) {
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
    }

    function selectBooking() {
      Storage.setBooking(vm.booking);
    }
  }
})();
