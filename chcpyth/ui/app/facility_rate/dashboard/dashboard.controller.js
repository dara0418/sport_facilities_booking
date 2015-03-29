(function() {
  'use strict';

  angular.module('app.facility_rate.dashboard')

  .controller('FacilityRateDashboardController', dashboardController);

  dashboardController.$inject = ['$scope', 'Notification', '$translate', 'Club',
    'Helpers', 'SharedProperties', 'Membership', '$location', 'ExceptionHandler',
    'FacilityRate', 'MembershipRole'];

  function dashboardController($scope, Notification, $translate, Club,
    Helpers, SharedProperties, Membership, $location, ExceptionHandler,
    FacilityRate, MembershipRole) {
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
      vm.selectedFacility = angular.copy(SharedProperties.selectedFacility);

      // Pull general rates of the current selected club.
      if (!$.isEmptyObject(vm.selectedFacility)) {
        FacilityRate.get({ facility__ref: vm.selectedFacility.ref }).$promise
        .then(setRates)
        .catch(handler.generalHandler);
      }

      if (!$.isEmptyObject(vm.selectedClub)) {
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

      SharedProperties.selectedFacilityRate = rate;

      $location.path('/facility_rate/profile');
    }

    function createRate() {
      // Clear selectedFacilityRate.
      SharedProperties.selectedFacilityRate = undefined;

      $location.path('/facility_rate/profile');
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
