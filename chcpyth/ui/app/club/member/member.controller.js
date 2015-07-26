(function() {
  'use strict';

  angular.module('app.club.member')

  .controller('ClubMemberController', controller);

  controller.$inject = ['$scope', '$location', 'Membership',
    'ExceptionHandler', 'Helpers', 'Storage'];

  function controller($scope, $location, Membership,
    ExceptionHandler, Helpers, Storage) {
    var vm = this;

    var handler = ExceptionHandler;

    vm.club = Storage.getClub();
    vm.members = [];
    vm.activate = activate;

    vm.activate();

    function activate() {
      Helpers.safeGetLoginMember(vm);

      // Pull membership requests of the selected club.
      if (vm.club !== undefined) {
        Membership.get({ club__ref: vm.club.ref }).$promise
        .then(setMembers)
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

    function setMembers(membershipResource) {
      $.each(membershipResource.objects, function(index, membership) {
        var member = membership.member;
        member.role = membership.role;
        vm.members.push(member);
      });
      console.log(vm.members);
    }
  }
})();
