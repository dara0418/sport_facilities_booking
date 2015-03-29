(function() {
  'use strict';

  angular.module('app.club.dashboard')

  .controller('ClubDashboardController', dashboardController);

  dashboardController.$inject = ['$scope', 'Notification', '$translate', 'Club',
    'Helpers', 'SharedProperties', 'Membership', '$location', 'ExceptionHandler'];

  function dashboardController($scope, Notification, $translate, Club,
    Helpers, SharedProperties, Membership, $location, ExceptionHandler) {
    var vm = this;

    var handler = ExceptionHandler;

    vm.selectClub = selectClub;
    vm.activate = activate;
    vm.goToMembershipRequest = goToMembershipRequest;
    vm.goToMembershipDashboard = goToMembershipDashboard;
    vm.goToFacilityDashboard = goToFacilityDashboard;
    vm.goToGeneralRule = goToGeneralRule;
    vm.goToSportRule = goToSportRule;
    vm.goToClubRate = goToClubRate;
    vm.goToEvent = goToEvent;
    vm.goToBooking = goToBooking;
    vm.quitClub = quitClub;

    vm.clubs = [];

    vm.activate();

    function selectClub(club) {
      SharedProperties.selectedClub = club;

      $location.path('/club/profile');
    }

    function goToMembershipRequest(club) {
      SharedProperties.selectedClub = club;

      $location.path('/membership_request/club_dashboard');
    }

    function goToMembershipDashboard(club) {
      SharedProperties.selectedClub = club;

      $location.path('/membership/dashboard');
    }

    function goToFacilityDashboard(club) {
      SharedProperties.selectedClub = club;

      $location.path('/facility/dashboard');
    }

    function goToGeneralRule(club) {
      SharedProperties.selectedClub = club;

      $location.path('/general_rule/dashboard');
    }

    function goToSportRule(club) {
      SharedProperties.selectedClub = club;

      $location.path('/sport_rule/dashboard');
    }

    function goToClubRate(club) {
      SharedProperties.selectedClub = club;

      $location.path('/club_rate/dashboard');
    }

    function goToEvent(club) {
      SharedProperties.selectedClub = club;

      $location.path('/event/club_dashboard');
    }

    function goToBooking(club) {
      SharedProperties.selectedClub = club;

      $location.path('/booking/club_dashboard');
    }

    // The startup function.
    function activate() {
      Helpers.safeGetLoginMember(vm);

      // Pull clubs of the current login user.
      Helpers.getClubsByMemberRef(vm.member.ref)
      .then(setClubs)
      .catch(handler.generalHandler);
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
