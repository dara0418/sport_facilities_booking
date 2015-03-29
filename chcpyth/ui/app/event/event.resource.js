(function() {
  angular.module('app.event.resource', [])

  .factory('Event', eventResource);

  eventResource.$inject = ['$resource', 'Config'];

  function eventResource($resource, Config) {
    var resourceUrl = Config.baseUrl + Config.apiPrefix + 'event/';

    return $resource(resourceUrl + ':ref', {ref: '@ref'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
