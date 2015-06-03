(function() {
  angular.module('app.picture.club.resource', [])

  .factory('ClubPicture', resource);

  resource.$inject = ['$resource', 'Config'];

  function resource($resource, Config) {
    var resourceUrl = Config.baseUrl + Config.apiPrefix + 'club_picture/';

    return $resource(resourceUrl + ':ref', {ref: '@ref'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
