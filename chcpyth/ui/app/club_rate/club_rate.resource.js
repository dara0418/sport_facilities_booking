(function() {
  angular.module('app.club_rate.resource', [])

  .factory('ClubRate', clubRateResource);

  clubRateResource.$inject = ['$resource', 'Config'];

  function clubRateResource($resource, Config) {
    var resourceUrl = Config.baseUrl + Config.apiPrefix + 'club_rate/';

    return $resource(resourceUrl + ':ref', {ref: '@ref'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
