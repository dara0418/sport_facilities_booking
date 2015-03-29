(function() {
  'use strict';

  angular.module('app.subscription_plan.dashboard')

  .controller('SubscriptionPlanDashboardController', dashboardController);

  dashboardController.$inject = ['$scope', '$translate', '$location', 'ExceptionHandler',
    'SubscriptionPlan'];

  function dashboardController($scope, $translate, $location, ExceptionHandler,
    SubscriptionPlan) {
    var vm = this;

    var handler = ExceptionHandler;

    vm.activate = activate;

    vm.plans = [];

    vm.activate();

    // The startup function.
    function activate() {
      SubscriptionPlan.get().$promise
      .then(setPlans)
      .catch(handler.generalHandler);
    }

    // Private functions.

    function setPlans(planResource) {
      vm.plans = planResource.objects;
    }
  }
})();
