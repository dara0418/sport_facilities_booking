(function() {
  'use strict';

  angular.module('app.facility_rule.profile')

  .controller('FacilityRuleProfileController', profileController);

  profileController.$inject = ['$scope', 'Notification', '$translate', 'Club',
    'Helpers', 'SharedProperties', 'Membership', '$location', 'ExceptionHandler',
    'FacilityRule', 'MembershipRole'];

  function profileController($scope, Notification, $translate, Club,
    Helpers, SharedProperties, Membership, $location, ExceptionHandler,
    FacilityRule, MembershipRole) {
    var vm = this;

    var handler = ExceptionHandler;

    vm.mRole = MembershipRole;
    vm.activate = activate;
    vm.update = update;
    vm.create = create;
    vm.remove = remove;

    vm.activate();

    // The startup function.
    function activate() {
      Helpers.safeGetLoginMember(vm);

      if (!$.isEmptyObject(SharedProperties.selectedFacilityRule)) {
        vm.rule = angular.copy(SharedProperties.selectedFacilityRule);

        // Clear selectedFacilityRule.
        SharedProperties.selectedFacilityRule = undefined;
      }
      else {
        // TODO - There's an error with unique checking.
        vm.rule = { facility: SharedProperties.selectedFacility };
      }
    }

    function update() {
      if ($.isEmptyObject(vm.rule.ref)) {
        // No ref, quit.
        return;
      }

      new FacilityRule(vm.rule).$update()
      .then(Helpers.updateSuccess)
      .catch(handler.generalHandler);
    }

    function create() {
      if (!$.isEmptyObject(vm.rule.ref)) {
        // The rule has a ref, it may be an existing rule.
        return;
      }

      new FacilityRule(vm.rule).$save()
      .then(Helpers.saveSuccess)
      .catch(handler.generalHandler);
    }

    function remove() {
      if ($.isEmptyObject(vm.rule.ref)) {
        // No ref, quit.
        return;
      }

      new FacilityRule(vm.rule).$delete()
      .then(Helpers.deleteSuccess)
      .catch(handler.generalHandler);
    }
  }
})();
