(function() {
  angular.module('app.membership_request.resource', [])

  .factory('MembershipRequest', membershipRequestResource);

  membershipRequestResource.$inject = ['$resource', 'Config'];

  function membershipRequestResource($resource, Config) {
    var resourceUrl = Config.baseUrl + Config.apiPrefix + 'membership_request/';

    return $resource(resourceUrl + ':ref', {ref: '@ref'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
