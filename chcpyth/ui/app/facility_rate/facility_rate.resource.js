(function() {
  angular.module('app.facility_rate.resource', [])

  .factory('FacilityRate', facilityRateResource);

  facilityRateResource.$inject = ['$resource', 'Config'];

  function facilityRateResource($resource, Config) {
    var resourceUrl = Config.baseUrl + Config.apiPrefix + 'facility_rate/';

    return $resource(resourceUrl + ':ref', {ref: '@ref'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
