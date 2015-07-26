(function() {
  'use strict';

  angular.module('app.club.booking')

  .controller('ClubBookingItemController', controller);

  controller.$inject = ['$scope', '$location', '$translate',
    'Helpers', 'ExceptionHandler', 'Storage', '$modal'];

  function controller($scope, $location, $translate,
    Helpers, ExceptionHandler, Storage, $modal) {
    var vm = this;

    vm.booking = $scope.booking;
    vm.activate = activate;
    vm.hasCompleted = $scope.hasCompleted;
    vm.viewProfile = viewProfile;

    vm.bookingProfileModal = $modal ({
      scope: $scope,
      template: 'app/booking/profile/profile.modal.html',
      show: false,
      placement: 'center'
    });

    var handler = ExceptionHandler;

    vm.activate();

    function activate() {
      // Check if user already signed in.
      Helpers.safeGetLoginMember(vm);

      if ($.isEmptyObject(vm.member)) {
        $location.path('/home');
      }

      // Calculate checkin date&time.
      var date = new Date(vm.booking.booking_date);
      var timeslot = vm.booking.booking_timeslot;
      vm.day = date.getDate();
      vm.month = Helpers.getMonthStr(date.getMonth());
      vm.year = date.getFullYear();
      vm.dow = Helpers.getDayOfWeekStr(date.getDay()); // Day of week.
      vm.time = Helpers.getTimeslotStr(timeslot);

      // Duration.
      vm.timeUnit = Helpers.getTimeUnitStr(vm.booking.time_unit);
    }

    function viewProfile() {
      // TODO - There's an exception thrown when showing the modal, it doesn't hurt the functions.
      //        Research the cause of exception.
      vm.bookingProfileModal.show();
    }
  }
})();
