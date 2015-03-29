(function() {
  angular.module('app.sport_rule.resource', [])

  .factory('SportRule', sportRuleResource);

  sportRuleResource.$inject = ['$resource', 'Config'];

  function sportRuleResource($resource, Config) {
    var resourceUrl = Config.baseUrl + Config.apiPrefix + 'sport_rule/';

    return $resource(resourceUrl + ':ref', {ref: '@ref'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
