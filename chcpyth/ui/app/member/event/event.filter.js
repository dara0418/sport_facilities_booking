(function() {
  'use strict';

  angular.module('app.member.event')

  .filter('filterUpcomingEvents', upcomingEvents)

  .filter('filterPastEvents', pastEvents)

  .filter('filterRegisteredEvents', registeredEvents);

  function upcomingEvents() {
    return function(events) {
      var filtered = [];

      angular.forEach(events, function(event) {
        if (new Date(event.end) >= new Date() && !event.hasJoined) {
          filtered.push(event);
        }
      });

      return filtered;
    }
  }

  function pastEvents() {
    return function(events) {
      var filtered = [];

      angular.forEach(events, function(event) {
        if (new Date(event.end) < new Date() && event.hasJoined) {
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
})();
