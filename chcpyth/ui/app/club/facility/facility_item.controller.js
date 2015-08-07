(function() {
  'use strict';

  angular.module('app.club.facility')

  .controller('ClubFacilityItemController', controller);

  controller.$inject = ['$scope', '$location', 'Helpers', 'ExceptionHandler',
    'Storage', '$modal', 'Facility', 'Notification'];

  function controller($scope, $location, Helpers, ExceptionHandler,
    Storage, $modal, Facility, Notification) {
    var vm = this;

    vm.activate = activate;
    vm.facility = $scope.facility;
    vm.viewProfile = viewProfile;
    vm.removeFacility = removeFacility;

    vm.facilityProfileModal = $modal({
      scope: $scope,
      template: 'app/facility/profile/profile.modal.html',
      show: false,
      placement: 'center'
    });

    vm.getTimeUnitStr = Helpers.getTimeUnitStr;
    vm.getSportTypeStr = Helpers.getSportTypeStr;

    $.each(['facility.updated', 'facility.close', 'modal.hide'],
      function(index, event) {
        $scope.$on(event, function() {
          vm.facilityProfileModal.hide();
        });
      });

    var handler = ExceptionHandler;

    vm.activate();

    function activate() {
      Helpers.safeGetLoginMember(vm);

      if (vm.member === undefined) {
        // Invalid login user. Clear cache and redirect to login page.
        Storage.clearLoginMember();
        $location.path('/home');
        return;
      }
    }

    function viewProfile() {
      vm.facilityProfileModal.show();
    }

    function removeFacility() {
      new Facility(vm.facility).$delete()
      .then(deleteSuccess)
      .catch(handler.generalHandler);
    }

    // Private functions.

    function deleteSuccess() {
      $scope.$emit('facility.deleted');

      Notification.notifySuccess('FACILITY_DELETED');
    }
  }
})();
