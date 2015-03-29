(function() {
  angular.module('app.general_rule.resource', [])

  .factory('GeneralRule', generalRuleResource);

  generalRuleResource.$inject = ['$resource', 'Config'];

  function generalRuleResource($resource, Config) {
    var resourceUrl = Config.baseUrl + Config.apiPrefix + 'general_rule/';

    return $resource(resourceUrl + ':ref', {ref: '@ref'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
