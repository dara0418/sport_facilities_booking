(function() {
  angular.module('app.event.resource')

  .factory('EventReg', eventRegResource);

  eventRegResource.$inject = ['$resource', 'Config'];

  function eventRegResource($resource, Config) {
    var resourceUrl = Config.baseUrl + Config.apiPrefix + 'club_event_registration/';

    return $resource(resourceUrl + ':ref', {ref: '@ref'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
