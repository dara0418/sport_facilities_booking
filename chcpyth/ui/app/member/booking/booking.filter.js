(function() {
  'use strict';

  angular.module('app.member.booking')

  .filter('bookingsBeforeToday', beforeToday)

  .filter('bookingsAfterToday', afterToday);

  function beforeToday() {
    return function(bookings) {
      var filtered = [];

      angular.forEach(bookings, function(booking) {
        if (new Date(booking.booking_date) < new Date()) {
          filtered.push(booking);
        }
      });

      return filtered;
    }
  }

  function afterToday() {
    return function(bookings) {
      var filtered = [];

      angular.forEach(bookings, function(booking) {
        if (new Date(booking.booking_date) >= new Date()) {
          filtered.push(booking);
        }
      });

      return filtered;
    }
  }
})();
