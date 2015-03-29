(function() {
  angular.module('app.club.resource', [])

  .factory('Club', clubResource);

  clubResource.$inject = ['$resource', 'Config'];

  function clubResource($resource, Config) {
    var resourceUrl = Config.baseUrl + Config.apiPrefix + 'club/';

    return $resource(resourceUrl + ':ref', {ref: '@ref'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
