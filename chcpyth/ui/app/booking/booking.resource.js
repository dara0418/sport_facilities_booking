(function() {
  angular.module('app.booking.resource', [])

  .factory('Booking', bookingResource);

  bookingResource.$inject = ['$resource', 'Config'];

  function bookingResource($resource, Config) {
    var resourceUrl = Config.baseUrl + Config.apiPrefix + 'booking/';

    return $resource(resourceUrl + ':ref', {ref: '@ref'}, {
      update: {
        method: 'PUT'
      },

      searchByFacilityAndDate: {
        method: 'GET',
        url: resourceUrl + 'search_by_facility_and_date/',
        isArray: true
      }
    });
  }
})();
