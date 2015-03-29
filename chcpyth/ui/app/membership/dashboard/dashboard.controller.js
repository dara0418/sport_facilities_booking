(function() {
  'use strict';

  angular.module('app.membership.dashboard')

  .controller('MembershipDashboardController', dashboardController);

  dashboardController.$inject = ['$scope', '$location', 'Notification', '$translate', 'Member',
    'Storage', 'Membership', 'ExceptionHandler', 'Helpers', 'SharedProperties',
    'MembershipRole'];

  function dashboardController($scope, $location, Notification, $translate, Member,
    Storage, Membership, ExceptionHandler, Helpers, SharedProperties,
    MembershipRole) {
    var vm = this;

    var handler = ExceptionHandler;

    vm.activate = activate;
    vm.changeRole = changeRole;
    vm.removeMember = removeMember;

    vm.role = MembershipRole;

    vm.activate();

    function activate() {
      Helpers.safeGetLoginMember(vm);

      vm.selectedClub = angular.copy(SharedProperties.selectedClub);

      // Pull membership requests of the selected club.
      if (vm.selectedClub !== undefined) {
        Membership.get({ club__ref: vm.selectedClub.ref }).$promise
        .then(setMemberships)
        .catch(handler.generalHandler);
      }
    }

    function changeRole(membership) {
      if ($.isEmptyObject(membership.newRole)) {
        // newRole wasn't set, quit.
        return;
      }

      membership.role = membership.newRole;
      new Membership(membership).$update()
      .then(Helpers.updateSuccess)
      .catch(handler.generalHandler);
    }

    function removeMember(membership) {
      if ($.isEmptyObject(membership)) {
        // No member selected.
        return;
      }

      new Membership(membership).$delete()
      .then(Helpers.deleteSuccess)
      .catch(handler.generalHandler);
    }

    // Private functions.

    function setMemberships(membershipResource) {
      vm.memberships = membershipResource.objects;
    }
  }
})();

