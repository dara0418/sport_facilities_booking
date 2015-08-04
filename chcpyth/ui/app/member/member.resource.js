(function() {
  angular.module('app.member.resource', [])

  .factory('Member', memberResource);

  memberResource.$inject = ['$resource', 'Config'];

  function memberResource($resource, Config) {
    var resourceUrl = Config.baseUrl + Config.apiPrefix + 'member/';

    return $resource(resourceUrl + ':ref', {ref: '@ref'}, {
      register: {
        method: 'POST',
        url: resourceUrl + 'register/'
      },

      login: {
        method: 'POST',
        url: resourceUrl + 'login/'
      },

      logout: {
        method: 'GET',
        url: resourceUrl + 'logout/'
      },

      update: {
        method: 'PUT'
      },

      change_password: {
        method: 'POST',
        url: resourceUrl + 'change_password/'
      },

      searchByName: {
        method: 'GET',
        url: resourceUrl + 'search_by_name/',
        isArray: true
      },

      searchByEmail: {
        method: 'GET',
        url: resourceUrl + 'search_by_email/',
        isArray: true
      },
    });
  }
})();
