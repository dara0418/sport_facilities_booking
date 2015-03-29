(function() {
  'use strict';

  angular.module('app.facility.profile')

  .controller('FacilityProfileController', profileController);

  profileController.$inject = ['$scope', 'Notification', '$translate', 'Club',
    'Helpers', 'SharedProperties', 'Membership', '$location', 'ExceptionHandler',
    'Facility', 'MembershipRole'];

  function profileController($scope, Notification, $translate, Club,
    Helpers, SharedProperties, Membership, $location, ExceptionHandler,
    Facility, MembershipRole) {
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

      if (!$.isEmptyObject(SharedProperties.selectedFacility)) {
        vm.facility = angular.copy(SharedProperties.selectedFacility);

        // Clear selectedFacility.
        SharedProperties.selectedFacility = undefined;
      }
      else {
        vm.facility = { club: SharedProperties.selectedClub };
      }
    }

    function update() {
      if ($.isEmptyObject(vm.facility.ref)) {
        // No ref, quit.
        return;
      }

      new Facility(vm.facility).$update()
      .then(Helpers.updateSuccess)
      .catch(handler.generalHandler);
    }

    function create() {
      if (!$.isEmptyObject(vm.facility.ref)) {
        // The facility has a ref, it may be an existing facility.
        return;
      }

      new Facility(vm.facility).$save()
      .then(Helpers.saveSuccess)
      .catch(handler.generalHandler);
    }

    function remove() {
      if ($.isEmptyObject(vm.facility.ref)) {
        // No ref, quit.
        return;
      }

      new Facility(vm.facility).$delete()
      .then(Helpers.deleteSuccess)
      .catch(handler.generalHandler);
    }
  }
})();
