(function() {
  angular.module('app.booking.resource')

  .factory('BookingMember', bookingResource);

  bookingResource.$inject = ['$resource', 'Config'];

  function bookingResource($resource, Config) {
    var resourceUrl = Config.baseUrl + Config.apiPrefix + 'booking_member/';

    return $resource(resourceUrl + ':ref', {ref: '@ref'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();

