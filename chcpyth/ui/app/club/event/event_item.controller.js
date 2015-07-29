(function() {
  'use strict';

  angular.module('app.club.event')

  .controller('ClubEventItemController', controller);

  controller.$inject = ['$scope', '$location', '$translate',
    'Helpers', 'ExceptionHandler', 'Storage', '$modal', 'Event'];

  function controller($scope, $location, $translate,
    Helpers, ExceptionHandler, Storage, $modal, Event) {
    var vm = this;

    vm.event = $scope.event;
    vm.activate = activate;
    vm.hasCompleted = $scope.hasCompleted;
    vm.viewProfile = viewProfile;
    vm.remove = remove;

    // This function will be called by the modal after the event has been updated.
    $scope.onUpdateSuccess = onUpdateSuccess;

    vm.eventProfileModal = $modal ({
      scope: $scope,
      template: 'app/event/profile/profile.modal.html',
      show: false,
      placement: 'center'
    });


    var handler = ExceptionHandler;

    vm.activate();

    function activate() {
      // Check if user already signed in.
      Helpers.safeGetLoginMember(vm);

      if ($.isEmptyObject(vm.member)) {
        $location.path('/home');
        return;
      }

      // Calculate event start&end date.
      var startDate = new Date(vm.event.start);
      vm.startDay = startDate.getDate();
      vm.startMonth = Helpers.getMonthStr(startDate.getMonth());
      vm.startYear = startDate.getFullYear();
      vm.startDow = Helpers.getDayOfWeekStr(startDate.getDay()); // Day of week.

      var endDate = new Date(vm.event.end);
      vm.endDay = endDate.getDate();
      vm.endMonth = Helpers.getMonthStr(endDate.getMonth());
      vm.endYear = endDate.getFullYear();
      vm.endDow = Helpers.getDayOfWeekStr(endDate.getDay()); // Day of week.
    }

    function remove() {
      if ($.isEmptyObject(vm.event.ref)) {
        // No ref, quit.
        return;
      }

      new Event(vm.event).$delete()
      .then(onDeleteSuccess)
      .catch(handler.generalHandler);
    }

    function viewProfile() {
      vm.eventProfileModal.show();
    }

    // Private functions.

    function onUpdateSuccess() {
      vm.eventProfileModal.hide();
    }

    function onDeleteSuccess() {
      $scope.$parent.$parent.loadEvents();

      Helpers.deleteSuccess();
    }
  }
})();
