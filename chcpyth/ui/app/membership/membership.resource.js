(function() {
  angular.module('app.membership.resource', [])

  .factory('Membership', membershipResource);

  membershipResource.$inject = ['$resource', 'Config'];

  function membershipResource($resource, Config) {
    var resourceUrl = Config.baseUrl + Config.apiPrefix + 'membership/';

    return $resource(resourceUrl + ':ref', {ref: '@ref'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();

