(function() {
  'use strict';

  angular.module('app.member.club')

  .controller('MemberClubController', memberClubController);

  memberClubController.$inject = ['$scope', 'ExceptionHandler', 'MembershipRole',
    'Helpers', '$location', 'Storage'];

  function memberClubController($scope, ExceptionHandler, MembershipRole,
    Helpers, $location, Storage) {
    var vm = this;
    var handler = ExceptionHandler;

    vm.activate = activate;
    vm.quitClub = quitClub;
    vm.goToClubDashboard = goToClubDashboard;
    vm.clubs = [];
    vm.mRole = MembershipRole;

    vm.activate();

    function activate() {
      Helpers.safeGetLoginMember(vm);

      // Pull clubs of the current login user.
      Helpers.getClubsByMemberRef(vm.member.ref)
      .then(setClubs)
      .catch(handler.generalHandler);
    }

    function goToClubDashboard(club) {
      Storage.setClub(club);
      $location.path('/club/dashboard');
    }

    function quitClub(club) {
      if ($.isEmptyObject(club)) {
        // No club selected, quit.
        return;
      }

      // Delete the membership.
      Membership.get({
        club__ref: club.ref,
        member__ref: vm.member.ref
      }).$promise
      .then(removeMembership)
      .then(quiteClubSuccess)
      .catch(handler.generalHandler);
    }

    // Private functions.

    function setClubs(clubs) {
      vm.clubs = clubs;
    }

    function removeMembership(membershipResource) {
      var memberships = membershipResource.objects;

      if (memberships.length != 1) {
        // Found no membership or multiple memberships.
        // Couldn't determine how to remove the membership in this situation, quit...
        return;
      }

      return new Membership(memberships[0]).$delete();
    }

    function quiteClubSuccess(removedMembership) {
      Notification.notifySuccess('QUIT_CLUB_SUCCESS');

      // Remove the deleted club from vm.clubs array.
      vm.clubs = $.grep(vm.clubs, function(club, index) {
        return club.ref != removedMembership.club.ref;
      });
    }
  }
})();
