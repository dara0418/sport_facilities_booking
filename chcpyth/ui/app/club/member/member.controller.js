(function() {
  'use strict';

  angular.module('app.club.member')

  .controller('ClubMemberController', controller);

  controller.$inject = ['$scope', '$location', '$translate',
    'Membership', 'ExceptionHandler', 'Helpers',
    'MembershipRole'];

  function controller($scope, $location, $translate,
    Membership, ExceptionHandler, Helpers,
    MembershipRole) {
    var vm = this;

    var handler = ExceptionHandler;

    vm.activate = activate;
    vm.changeRole = changeRole;
    vm.removeMember = removeMember;
    vm.club = $scope.club;

    vm.mRole = MembershipRole;

    vm.activate();

    function activate() {
      Helpers.safeGetLoginMember(vm);

      // Pull membership requests of the selected club.
      if (vm.club !== undefined) {
        Membership.get({ club__ref: vm.club.ref }).$promise
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
