(function() {
  'use strict';

  angular.module('app.general_rule.profile')

  .controller('GeneralRuleProfileController', profileController);

  profileController.$inject = ['$scope', 'Notification', '$translate', 'Club',
    'Helpers', 'SharedProperties', 'Membership', '$location', 'ExceptionHandler',
    'GeneralRule', 'MembershipRole'];

  function profileController($scope, Notification, $translate, Club,
    Helpers, SharedProperties, Membership, $location, ExceptionHandler,
    GeneralRule, MembershipRole) {
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

      if (!$.isEmptyObject(SharedProperties.selectedGeneralRule)) {
        vm.rule = angular.copy(SharedProperties.selectedGeneralRule);

        // Clear selectedGeneralRule.
        SharedProperties.selectedGeneralRule = undefined;
      }
      else {
        vm.rule = { club: SharedProperties.selectedClub };
      }
    }

    function update() {
      if ($.isEmptyObject(vm.rule.ref)) {
        // No ref, quit.
        return;
      }

      new GeneralRule(vm.rule).$update()
      .then(Helpers.updateSuccess)
      .catch(handler.generalHandler);
    }

    function create() {
      if (!$.isEmptyObject(vm.rule.ref)) {
        // The rule has a ref, it may be an existing rule.
        return;
      }

      new GeneralRule(vm.rule).$save()
      .then(Helpers.saveSuccess)
      .catch(handler.generalHandler);
    }

    function remove() {
      if ($.isEmptyObject(vm.rule.ref)) {
        // No ref, quit.
        return;
      }

      new GeneralRule(vm.rule).$delete()
      .then(Helpers.deleteSuccess)
      .catch(handler.generalHandler);
    }
  }
})();
