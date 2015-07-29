(function() {
  'use strict';

  angular.module('app.club.profile')

  .controller('ClubProfileController', profileController);

  profileController.$inject = ['$scope', '$translate', 'Club',
    'Helpers', 'Storage', 'ExceptionHandler', 'Status'];

  function profileController($scope, $translate, Club,
    Helpers, Storage, ExceptionHandler, Status) {
    var vm = this;

    var handler = ExceptionHandler;

    vm.club = Storage.getClub();
    vm.updateProfile = updateProfile;
    vm.activate = activate;
    vm.cancel = cancel;
    vm.stu = Status;

    vm.activate();

    function updateProfile() {
      if ($scope.form.$invalid) {
        return;
      }

      if (vm.club !== undefined) {
        Status.setStatusUpdating();

        // Wrap object with angular resource.
        new Club(vm.club).$update()
        .then(updateSuccess)
        .catch(handler.generalHandler);
      }
    }

    function activate() {
      Helpers.safeGetLoginMember(vm);

      if (vm.member === undefined) {
        $location.path('/home');
        return;
      }

      vm.club.primary_phone = ($.isEmptyObject(vm.club.primary_phone) ?
        vm.club.primary_phone : Number(vm.club.primary_phone));
      vm.club.secondary_phone = ($.isEmptyObject(vm.club.secondary_phone) ?
        vm.club.secondary_phone : Number(vm.club.secondary_phone));
      vm.club.fax_number = ($.isEmptyObject(vm.club.fax_number) ?
        vm.club.fax_number : Number(vm.club.fax_number));
    }

    function cancel() {
      // Reset the recent changes.
      vm.club = Storage.getClub();

      // Convert phone numbers to int type, otherwise there will be an error
      // due to the type="number" in input tags. It won't hurt the backend.
      vm.club.primary_phone = ($.isEmptyObject(vm.club.primary_phone) ?
        vm.club.primary_phone : Number(vm.club.primary_phone));
      vm.club.secondary_phone = ($.isEmptyObject(vm.club.secondary_phone) ?
        vm.club.secondary_phone : Number(vm.club.secondary_phone));
      vm.club.fax_number = ($.isEmptyObject(vm.club.fax_number) ?
        vm.club.fax_number : Number(vm.club.fax_number));
    }

    function updateSuccess(result) {
      Helpers.updateSuccess();
      Status.resetStatus();

      Storage.setClub(vm.club);
    }
  }
})();
