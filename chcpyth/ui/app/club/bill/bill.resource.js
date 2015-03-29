(function() {
  angular.module('app.club.bill', [])

  .factory('Bill', billResource);

  billResource.$inject = ['$resource', 'Config'];

  function billResource($resource, Config) {
    var resourceUrl = Config.baseUrl + Config.apiPrefix + 'bill/';

    return $resource(resourceUrl + ':ref', {ref: '@ref'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
