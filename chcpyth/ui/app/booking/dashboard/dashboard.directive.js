(function() {
  'use strict';

  angular.module('app.booking.dashboard')

  .directive('bookingDashboard', directive);

  directive.$inject = ['BookingDashboardService', 'Helpers', '$location',
    'ExceptionHandler', 'Config', 'SportType'];

  function directive(service, Helpers, $location, handler, Config, SportType) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/booking/dashboard/dashboard.html',
      controller: 'BookingDashboardController',
      controllerAs: 'vm',
      scope: {},
      bindToController: true,
      link: linkFunc
    };

    function linkFunc(scope, element, attrs, ctrl) {
      var vm = ctrl;
      vm.selectType = selectType;
      vm.search = search;
      vm.dayAmount = Config.bookingSearchDayAmount;
      vm.Slot = Slot;

      vm.sportOptions = [
        { name: "Tennis", value: SportType.TENNIS },
        { name: "Ping Pong", value: SportType.PING_PONG },
        { name: "Paddle", value: SportType.PADDLE },
        { name: "Badminton", value: SportType.BADMINTON },
        { name: "Squash", value: SportType.SQUASH },
        { name: "Football 5", value: SportType.FOOTBALL_5 },
      ];

      activation();

      function activation() {
        vm.selectedType = 'facility';
        vm.selectedSport = SportType.TENNIS;
      }

      function search() {
        if (vm.selectedType == 'facility') {
          searchBySportType();
        }
      }

      function selectType(selectedType) {
        vm.selectedType = selectedType;
      }

      function Slot(slotName, amount) {
        this.slotName = slotName;
        this.amount = amount;
      }

      // Private functions.

      function searchBySportType() {
        vm.nextFewDays = Helpers.getNextFewDays(vm.selectedDate, vm.dayAmount);

        if (vm.selectedType == 'facility') {
          service.getFacilityByType(vm.selectedSport, vm.location, vm.country)
          .then(setFacilities)
          .then(getBookingByFacility)
          .then(getAvailableSlots)
          .catch(handler.generalHandler);
        }
      }

      function getBookingByFacility() {
        return service.getBookingByFacility(vm.facilities, vm.selectedDate,
          vm.nextFewDays[vm.dayAmount - 1]);
      }

      function setFacilities(data) {
        vm.facilities = data;
      }

      function getAvailableSlots() {
        angular.forEach(vm.facilities, function(facility, index) {
          if (vm.nextFewDays === undefined || vm.nextFewDays.length != vm.dayAmount) {
            return;
          }

          // Array with slot names.
          var daySlotNames = Helpers.buildBookingSlots(
            facility.club.open_time,
            facility.club.close_time,
            30
          );

          // Array with slot names.
          var holidaySlotNames = Helpers.buildBookingSlots(
            facility.club.open_time_holiday,
            facility.club.close_time_holiday,
            30
          );

          facility.slots = getSlots(daySlotNames, holidaySlotNames,
            facility.bookings, vm.nextFewDays, facility.amount);
        });
      }

      // Private functions.

      function getSlots(daySlotNames, holidaySlotNames, bookings,
        nextFewDays, amount) {
        var availableSlots = [];

        for (var i = 0; i < nextFewDays.length; i++) {
          var bufSlots = $.map(
            (Helpers.isHoliday(nextFewDays[i]) ? holidaySlotNames : daySlotNames),
            function(slotName, index) {
              return new Slot(slotName, amount);
            }
          );

          availableSlots.push(bufSlots);
        }

        var dayIx = 0;
        var bookingIx = 0;

        do {
          if (dayIx >= nextFewDays.length) {
            break;
          }

          var day = nextFewDays[dayIx];
          var booking = bookings[bookingIx];

          if (booking === undefined) {
            break;
          }

          var diff = Helpers.getDayDiff(booking.booking_date, day);

          if (diff == 0) {
            availableSlots[dayIx] = updateSlots(
              availableSlots[dayIx],
              booking.booking_timeslot,
              booking.duration,
              booking.time_unit
            );
          }
          else if(diff > 0) {
            // Booking date lag behind. This shouldn't happen if things work as expected.
            // But we will skip this booking.
            continue;
          }
          else {
            // Current day lag behind. Should increase the day index and reset the
            // buffer array.
            dayIx++;

            // Don't miss this booking.
            availableSlots[dayIx] = updateSlots(
              availableSlots[dayIx],
              booking.booking_timeslot,
              booking.duration,
              booking.time_unit
            );
          }

          bookingIx++;
        }
        while (bookingIx >= bookings.length);

        return availableSlots;
      }

      // Update available amounts of the facility of different timeslots.
      function updateSlots(slots, startSlotName, duration, timeUnit) {
        // TODO - Long bookings will cause problems if we simply use 'duration' and
        // 'time_unit' to determine the booked out slots.
        // The extreme example is: if a user booked a facility for many years,
        // then we have to search all history bookings to determine whether the facility
        // is totally booked out, this causes performance issue and also anti-pattern.
        // My suggestion is limit the single bookings to <1 day. Probably abandon
        // time_unit field and use minutes as standard unit instead.
        // Use a new facility subscription model to maintain long bookings,
        // like 1 week/month/quarter/year.
        //
        // In the currently implementation, we won't consider bookings >1 day.
        var interval = Helpers.getDurationMins(duration, timeUnit);
        var endSlotName = Helper.makeTimeslot(startSlotName, interval);

        var newSlots = [];

        for (var i = 0; i < slots.length; i++) {
          var slot = slots[i];

          if (Helpers.compareTimeslots(slot.slotName, startSlotName) >= 0 &&
            Helpers.compareTimeslots(slot, endSlotName) < 0) {
            slot.amount = slot.amount - 1;

            if (slot.amount <= 0) {
              slots.remove(i);
            }
          }
        }

        $.map(slots, function(slot, amount) {
        });
      }

      // Get most similar slot index in slots array right before/after the given slot.
      // Which means this slot should be marked as booked out because
      // the given slot partially/completely processes the matched slot.
      function matchSlot(slots, slot, isStartSlot) {
        var ix = slots.indexOf(slot);
        if (ix >= 0) {
          // Exact match.
          return isStartSlot ? ix : ix - 1;
        }
        else {
          // Not exact match. Should comare the slots.
          for (var i = 0; i < slots.length; i++) {
            if (Helpers.compareTimeslots(slots[i], slot) < 0 &&
              (i >= slots.length || Helpers.comare(slots[i + 1], slot) > 0)) {
              return i;
            }
          }

          // None is found.
          return -1;
        }
      }
    }

    return directive;
  }
})();
