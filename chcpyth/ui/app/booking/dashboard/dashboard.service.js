(function() {
  'use strict';

  angular.module('app.booking.dashboard')

  .service('BookingDashboardService', service);

  service.$inject = ['Club', 'Helpers', 'Booking', 'Facility', '$q', 'FacilityRate',
    'Config'];

  function service(Club, Helpers, Booking, Facility, $q, FacilityRate,
    Config) {

    var methods = {
      getFacilityByType: getFacilityByType,
      getFacilityBooking: getFacilityBooking,
      getFacilityRate: getFacilityRate
    };

    function getFacilityByType(facilityType, location, country) {
      return Facility.searchByType({
        keyword: facilityType,
        location: location,
        country: country
      }).$promise
    }

    function getFacilityBooking(facilities, startDate, endDate) {
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

    function getFacilityRate(facilities) {
      var deferred = $q.defer();

      var rates = $.map(facilities, function(facility, index) {
        return FacilityRate.get({ facility__ref: facility.ref }).$promise
          .then(function(rates) {
            for (var i = 0; i < rates.length; i++) {
              if (rates[i].currency == Config.currency) {
                facility.rates = rates;
              }
            }
          });
      });

      $q.all(rates).then(function() {
        deferred.resolve;
      });

      return deferred.promise;
    }

    return methods;
  }
})();
