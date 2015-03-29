(function() {
  'use strict';

  angular.module('app.facility.dashboard')

  .controller('FacilityDashboardController', dashboardController);

  dashboardController.$inject = ['$scope', 'Notification', '$translate', 'Club',
    'Helpers', 'SharedProperties', 'Membership', '$location', 'ExceptionHandler',
    'Facility', 'MembershipRole'];

  function dashboardController($scope, Notification, $translate, Club,
    Helpers, SharedProperties, Membership, $location, ExceptionHandler,
    Facility, MembershipRole) {
    var vm = this;

    var handler = ExceptionHandler;

    vm.mRole = MembershipRole;
    vm.createFacility = createFacility;
    vm.editFacility = editFacility;
    vm.activate = activate;
    vm.goToFacilityRule = goToFacilityRule;
    vm.goToFacilityRate = goToFacilityRate;

    vm.facilities = [];

    vm.activate();

    // The startup function.
    function activate() {
      Helpers.safeGetLoginMember(vm);

      vm.selectedClub = angular.copy(SharedProperties.selectedClub);

      // Pull facilities of the current selected club.
      if (!$.isEmptyObject(vm.selectedClub)) {
        Facility.get({ club__ref: vm.selectedClub.ref }).$promise
        .then(setFacilities)
        .catch(handler.generalHandler);

        Helpers.getMembershipsByClubAndMember(vm.member.ref, vm.selectedClub.ref)
        .then(setClubRole)
        .catch(handler.generalHandler);
      }
    }

    function goToFacilityRule(facility) {
      SharedProperties.selectedFacility = facility;

      $location.path('/facility_rule/dashboard');
    }

    function goToFacilityRate(facility) {
      SharedProperties.selectedFacility = facility;

      $location.path('/facility_rate/dashboard');
    }

    function editFacility(facility) {
      if ($.isEmptyObject(facility)) {
        // No facility selected, quit.
        return;
      }

      SharedProperties.selectedFacility = facility;

      $location.path('/facility/profile');
    }

    function createFacility() {
      // Clear selectedFacility.
      SharedProperties.selectedFacility = undefined;

      $location.path('/facility/profile');
    }

    // Private functions.

    function setFacilities(facilityResources) {
      vm.facilities = facilityResources.objects;
    }

    function setClubRole(memberships) {
      if (memberships.length == 1) {
        vm.role = memberships[0].role;
      }
    }
  }
})();
