(function() {
  'use strict';

  angular.module('app.booking.new_booking')

  .directive('newBooking', directive);

  directive.$inject = ['Booking', 'TimeUnit', 'Config'];

  function directive(Booking, TimeUnit, Config) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/booking/new_booking/new_booking.html',
      controller: 'NewBookingController',
      controllerAs: 'vm',
      scope: {
        facility: '=',
        selectedDate: '=',
        selectedSlot: '='
      },
      bindToController: true,
      link: linkFunc
    };

    function linkFunc(scope, element, attrs, ctrl) {
      var vm = ctrl;

      activation();

      function activation() {
        vm.booking = new Booking({
          facility: facility,
          booking_date: vm.selectedDate,
          booking_timeslot: vm.selectedSlot,
          // We force every booking to use minute as time unit.
          // Longer booking > 1 day should consider to use 'subscription'.
          time_unit: TimeUnit.MINUTE,
          currency: Config.currency
        });
      }
    }

    return directive;
  }
})();
