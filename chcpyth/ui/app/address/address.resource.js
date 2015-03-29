(function() {
  angular.module('app.address.resource', [])

  .factory('Address', addressResource);

  addressResource.$inject = ['$resource', 'Config'];

  function addressResource($resource, Config) {
    var resourceUrl = Config.baseUrl + Config.apiPrefix + 'address/';

    return $resource(resourceUrl + ':ref', {ref: '@ref'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
