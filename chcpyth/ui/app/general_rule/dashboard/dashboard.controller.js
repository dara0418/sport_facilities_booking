(function() {
  'use strict';

  angular.module('app.general_rule.dashboard')

  .controller('GeneralRuleDashboardController', dashboardController);

  dashboardController.$inject = ['$scope', 'Notification', '$translate', 'Club',
    'Helpers', 'SharedProperties', 'Membership', '$location', 'ExceptionHandler',
    'GeneralRule', 'MembershipRole'];

  function dashboardController($scope, Notification, $translate, Club,
    Helpers, SharedProperties, Membership, $location, ExceptionHandler,
    GeneralRule, MembershipRole) {
    var vm = this;

    var handler = ExceptionHandler;

    vm.mRole = MembershipRole;
    vm.createRule = createRule;
    vm.editRule = editRule;
    vm.activate = activate;

    vm.rules = [];

    vm.activate();

    // The startup function.
    function activate() {
      Helpers.safeGetLoginMember(vm);

      vm.selectedClub = angular.copy(SharedProperties.selectedClub);

      // Pull general rules of the current selected club.
      if (!$.isEmptyObject(vm.selectedClub)) {
        GeneralRule.get({ club__ref: vm.selectedClub.ref }).$promise
        .then(setRules)
        .catch(handler.generalHandler);

        Helpers.getMembershipsByClubAndMember(vm.member.ref, vm.selectedClub.ref)
        .then(setClubRole)
        .catch(handler.generalHandler);
      }
    }

    function editRule(rule) {
      if ($.isEmptyObject(rule)) {
        // No rule selected, quit.
        return;
      }

      SharedProperties.selectedGeneralRule = rule;

      $location.path('/general_rule/profile');
    }

    function createRule() {
      // Clear selectedRule.
      SharedProperties.selectedGeneralRule = undefined;

      $location.path('/general_rule/profile');
    }

    // Private functions.

    function setRules(ruleResource) {
      vm.rules = ruleResource.objects;
    }

    function setClubRole(memberships) {
      if (memberships.length == 1) {
        vm.role = memberships[0].role;
      }
    }
  }
})();
