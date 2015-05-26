(function() {
  'use strict';

  angular.module('app.club.facility')

  .controller('ClubFacilityController', controller);

  controller.$inject = ['$scope', 'Notification', '$translate', 'Club',
    'Helpers', 'SharedProperties', 'Membership', '$location', 'ExceptionHandler',
    'Facility', 'MembershipRole'];

  function controller($scope, Notification, $translate, Club,
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
    vm.club = $scope.club;

    vm.facilities = [];

    vm.activate();

    // The startup function.
    function activate() {
      Helpers.safeGetLoginMember(vm);

      // Pull facilities of the current selected club.
      if (!$.isEmptyObject(vm.club.ref)) {
        Facility.get({ club__ref: vm.club.ref }).$promise
        .then(setFacilities)
        .catch(handler.generalHandler);

        // Retrieve permission.
        Helpers.getMembershipsByClubAndMember(vm.member.ref, vm.club.ref)
        .then(setClubRole)
        .catch(handler.generalHandler);
      }
    }

    // TODO - CURRENTLY DISABLED.
    function goToFacilityRule(facility) {
      Storage.setFacility(facility);

      $location.path('/facility_rule/dashboard');
    }

    // TODO - CURRENTLY DISABLED.
    function goToFacilityRate(facility) {
      Storage.setFacility(facility);

      $location.path('/facility_rate/dashboard');
    }

    function editFacility(facility) {
      if ($.isEmptyObject(facility)) {
        // No facility selected, quit.
        return;
      }

      Storage.setFacility(facility);
    }

    function createFacility() {
      // Clear selectedFacility.
      Storage.clearFacility();
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
