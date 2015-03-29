(function() {
  'use strict';

  angular.module('app.facility_rate.profile')

  .controller('FacilityRateProfileController', profileController);

  profileController.$inject = ['$scope', 'Notification', '$translate', 'Club',
    'Helpers', 'SharedProperties', 'Membership', '$location', 'ExceptionHandler',
    'FacilityRate', 'MembershipRole'];

  function profileController($scope, Notification, $translate, Club,
    Helpers, SharedProperties, Membership, $location, ExceptionHandler,
    FacilityRate, MembershipRole) {
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

      if (!$.isEmptyObject(SharedProperties.selectedFacilityRate)) {
        vm.rate = angular.copy(SharedProperties.selectedFacilityRate);

        // Clear selectedFacilityRate.
        SharedProperties.selectedFacilityRate = undefined;
      }
      else {
        vm.rate = { facility: SharedProperties.selectedFacility };
      }
    }

    function update() {
      if ($.isEmptyObject(vm.rate.ref)) {
        // No ref, quit.
        return;
      }

      new FacilityRate(vm.rate).$update()
      .then(Helpers.updateSuccess)
      .catch(handler.generalHandler);
    }

    function create() {
      if (!$.isEmptyObject(vm.rate.ref)) {
        // The rate has a ref, it may be an existing rate.
        return;
      }

      new FacilityRate(vm.rate).$save()
      .then(Helpers.saveSuccess)
      .catch(handler.generalHandler);
    }

    function remove() {
      if ($.isEmptyObject(vm.rate.ref)) {
        // No ref, quit.
        return;
      }

      new FacilityRate(vm.rate).$delete()
      .then(Helpers.deleteSuccess)
      .catch(handler.generalHandler);
    }
  }
})();
