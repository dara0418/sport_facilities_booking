(function() {
  'use strict';

  angular.module('app.facility_rule.dashboard')

  .controller('FacilityRuleDashboardController', dashboardController);

  dashboardController.$inject = ['$scope', 'Notification', '$translate', 'Club',
    'Helpers', 'SharedProperties', 'Membership', '$location', 'ExceptionHandler',
    'FacilityRule', 'MembershipRole'];

  function dashboardController($scope, Notification, $translate, Club,
    Helpers, SharedProperties, Membership, $location, ExceptionHandler,
    FacilityRule, MembershipRole) {
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
      vm.selectedFacility = angular.copy(SharedProperties.selectedFacility);

      // Pull facility rules of the current selected facility.
      if (!$.isEmptyObject(vm.selectedFacility)) {
        FacilityRule.get({ facility__ref: vm.selectedFacility.ref }).$promise
        .then(setRules)
        .catch(handler.facilityHandler);

      }


      if (!$.isEmptyObject(vm.selectedClub)) {
        Helpers.getMembershipsByClubAndMember(vm.member.ref, vm.selectedClub.ref)
        .then(setClubRole)
        .catch(handler.facilityHandler);
      }
    }

    function editRule(rule) {
      if ($.isEmptyObject(rule)) {
        // No rule selected, quit.
        return;
      }

      SharedProperties.selectedFacilityRule = rule;

      $location.path('/facility_rule/profile');
    }

    function createRule() {
      // Clear selectedRule.
      SharedProperties.selectedFacilityRule = undefined;

      $location.path('/facility_rule/profile');
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
