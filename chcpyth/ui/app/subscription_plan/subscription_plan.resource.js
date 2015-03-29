(function() {
  angular.module('app.subscription_plan.resource', [])

  .factory('SubscriptionPlan', subscriptionPlanResource);

  subscriptionPlanResource.$inject = ['$resource', 'Config'];

  function subscriptionPlanResource($resource, Config) {
    var resourceUrl = Config.baseUrl + Config.apiPrefix + 'subscription_plan/';

    return $resource(resourceUrl + ':ref', {ref: '@ref'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
