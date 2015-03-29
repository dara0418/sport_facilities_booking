(function() {
  angular.module('app.facility_rule.resource', [])

  .factory('FacilityRule', facilityRuleResource);

  facilityRuleResource.$inject = ['$resource', 'Config'];

  function facilityRuleResource($resource, Config) {
    var resourceUrl = Config.baseUrl + Config.apiPrefix + 'facility_rule/';

    return $resource(resourceUrl + ':ref', {ref: '@ref'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
