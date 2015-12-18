(function() {
  angular.module('app.facility.resource', [])

  .factory('Facility', facilityResource);

  facilityResource.$inject = ['$resource', 'Config'];

  function facilityResource($resource, Config) {
    var resourceUrl = Config.baseUrl + Config.apiPrefix + 'facility/';

    return $resource(resourceUrl + ':ref', {ref: '@ref'}, {
      update: {
        method: 'PUT'
      },

      searchByType: {
        method: 'GET',
        url: resourceUrl + 'search_by_type/',
        isArray: true
      }
    });
  }
})();
