(function() {
  'use strict';

  angular.module('app.club.profile')

  .controller('ClubProfileController', profileController);

  profileController.$inject = ['$scope', 'Notification', '$translate', 'Club',
    'Helpers', 'SharedProperties', 'ExceptionHandler'];

  function profileController($scope, Notification, $translate, Club,
    Helpers, SharedProperties, ExceptionHandler) {
    var vm = this;

    var handler = ExceptionHandler;

    vm.updateProfile = updateProfile;
    vm.activate = activate;

    vm.activate();

    function updateProfile() {
      if (vm.club !== undefined) {
        // Wrap object with angular resource.
        new Club(vm.club).$update()
        .then(updateSuccess)
        .catch(handler.generalHandler);
      }
    }

    function activate() {
      Helpers.safeGetLoginMember(vm);

      vm.club = angular.copy(SharedProperties.selectedClub);
    }

    function updateSuccess(result) {
      Notification.notifySuccess('UPDATE_SUCCESS');

      SharedProperties.selectedClub = angular.copy(vm.club);
    }
  }
})();
