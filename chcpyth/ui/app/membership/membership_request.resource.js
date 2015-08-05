(function() {
  angular.module('app.membership.resource')

  .factory('MembershipRequest', resource);

  resource.$inject = ['$resource', 'Config'];

  function resource($resource, Config) {
    var resourceUrl = Config.baseUrl + Config.apiPrefix + 'membership_request/';

    return $resource(resourceUrl + ':ref', {ref: '@ref'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
