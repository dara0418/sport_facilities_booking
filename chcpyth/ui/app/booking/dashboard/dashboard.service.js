(function() {
  'use strict';

  angular.module('app.booking.dashboard')

  .service('BookingDashboardService', service);

  service.$inject = ['Club', 'Helpers', 'Booking', 'Facility', '$q'];

  function service(Club, Helpers, Booking, Facility, $q) {

    var methods = {
      getFacilityByType: getFacilityByType,
      getBookingByFacility: getBookingByFacility
    };

    function getFacilityByType(facilityType, location, country) {
      return Facility.searchByType({
        keyword: facilityType,
        location: location,
        country: country
      }).$promise
    }

    function getBookingByFacility(facilities, startDate, endDate) {
      var deferred = $q.defer();

      var bookings = $.map(facilities, function(facility, index) {
        var startDateStr = Helpers.getDateStr(startDate);
        var endDateStr = Helpers.getDateStr(endDate);

        return Booking.searchByFacilityAndDate({
          facility_ref: facility.ref,
          start_date: startDateStr,
          end_date: endDateStr
        }).$promise
        .then(function(bookings) {
          // Attach bookings to facility.
          facility.bookings = bookings;
        });
      });

      $q.all(bookings).then(function() {
        deferred.resolve();
      });

      return deferred.promise;
    }

    return methods;
  }
})();
