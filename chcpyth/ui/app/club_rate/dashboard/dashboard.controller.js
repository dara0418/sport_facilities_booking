(function() {
  'use strict';

  angular.module('app.club_rate.dashboard')

  .controller('ClubRateDashboardController', dashboardController);

  dashboardController.$inject = ['$scope', 'Notification', '$translate', 'Club',
    'Helpers', 'SharedProperties', 'Membership', '$location', 'ExceptionHandler',
    'ClubRate', 'MembershipRole'];

  function dashboardController($scope, Notification, $translate, Club,
    Helpers, SharedProperties, Membership, $location, ExceptionHandler,
    ClubRate, MembershipRole) {
    var vm = this;

    var handler = ExceptionHandler;

    vm.mRole = MembershipRole;
    vm.createRate = createRate;
    vm.editRate = editRate;
    vm.activate = activate;

    vm.rates = [];

    vm.activate();

    // The startup function.
    function activate() {
      Helpers.safeGetLoginMember(vm);

      vm.selectedClub = angular.copy(SharedProperties.selectedClub);

      // Pull general rates of the current selected club.
      if (!$.isEmptyObject(vm.selectedClub)) {
        ClubRate.get({ club__ref: vm.selectedClub.ref }).$promise
        .then(setRates)
        .catch(handler.generalHandler);

        Helpers.getMembershipsByClubAndMember(vm.member.ref, vm.selectedClub.ref)
        .then(setClubRole)
        .catch(handler.generalHandler);
      }
    }

    function editRate(rate) {
      if ($.isEmptyObject(rate)) {
        // No rate selected, quit.
        return;
      }

      SharedProperties.selectedClubRate = rate;

      $location.path('/club_rate/profile');
    }

    function createRate() {
      // Clear selectedClubRate.
      SharedProperties.selectedClubRate = undefined;

      $location.path('/club_rate/profile');
    }

    // Private functions.

    function setRates(rateResource) {
      vm.rates = rateResource.objects;
    }

    function setClubRole(memberships) {
      if (memberships.length == 1) {
        vm.role = memberships[0].role;
      }
    }
  }
})();
