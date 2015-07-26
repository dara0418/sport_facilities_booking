(function() {
  'use strict';

  angular.module('app.components.filters', [])

  .filter('range', range)

  .filter('filterUpcomingEvents', upcomingEvents)

  .filter('filterPastEvents', pastEvents)

  .filter('filterRegisteredEvents', registeredEvents)

  .filter('bookingsBeforeToday', bookingsBeforeToday)

  .filter('bookingsAfterToday', bookingsAfterToday);

  function range() {
    return function(input, min, max) {
      min = parseInt(min);
      max = parseInt(max);
      for (var i = min; i <= max; i++)
        input.push(i.toString());

      return input;
    }
  }

  function upcomingEvents() {
    return function(events, isClub) {
      var filtered = [];

      angular.forEach(events, function(event) {
        if (new Date(event.end) >= new Date() && (isClub || !event.hasJoined)) {
          filtered.push(event);
        }
      });

      return filtered;
    }
  }

  function pastEvents() {
    return function(events, isClub) {
      var filtered = [];

      angular.forEach(events, function(event) {
        if (new Date(event.end) < new Date() && (isClub || event.hasJoined)) {
          filtered.push(event);
        }
      });

      return filtered;
    }
  }

  function registeredEvents() {
    return function(events) {
      var filtered = [];

      angular.forEach(events, function(event) {
        if (new Date(event.end) >= new Date() && event.hasJoined) {
          filtered.push(event);
        }
      });

      return filtered;
    }
  }

  function bookingsBeforeToday() {
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

  function bookingsAfterToday() {
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
