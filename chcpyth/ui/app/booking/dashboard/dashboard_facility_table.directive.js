(function() {
  'use strict';

  angular.module('app.booking.dashboard')

  .directive('bookingDashboardFacilityTable', directive);

  directive.$inject = ['Helpers', 'Config', '$modal'];

  function directive(Helpers, Config, $modal) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/booking/dashboard/dashboard_facility_table.html',
      controller: 'BookingDashboardFacilityTableController',
      controllerAs: 'vm',
      require: ['^bookingDashboard', 'bookingDashboardFacilityTable'],
      scope: {},
      bindToController: true,
      link: linkFunc
    };

    function linkFunc(scope, element, attrs, ctrls) {
      var dashboardCtrl = ctrls[0];
      var vm = ctrls[1];

      vm.dayAmount = Config.bookingSearchDayAmount;
      vm.nextFewDays = Helpers.getNextFewDays(dashboardCtrl.selectedDate, vm.dayAmount);
      vm.facilities = dashboardCtrl.facilities;
      vm.cursors = getCursors();

      vm.getSlotName = getSlotName;
      vm.selectSlot = selectSlot;

      vm.bookingProfileModal = $modal ({
        scope: scope,
        template: 'app/booking/profile/profile.modal.html',
        show: false,
        placement: 'center'
      });

      function getSlotName(slot) {
        if (slot === undefined || slot.slotName === undefined) {
          return '';
        }

        var res = Helpers.getStrOpt(slot.slotName);
        if (res.length == 4) {
          return res.substring(0, 2) + ':' + res.substring(2);
        }
        else {
          return res;
        }
      }

      function selectSlot(facility, day, offset) {
        var slotName = Helpers.getStrOpt(facility.slots[day][offset].slotName);

        if (slotName !== '') {
          vm.bookingProfileModal.show();
        }
      }

      // Private functions.

      function getCursors() {
        var cursors = [];
        for (var i = 0; i <= vm.dayAmount; i++) {
          // All cursors should start from position 0.
          cursors.push(0);
        }

        return cursors;
      }
    }

    return directive;
  }
})();
