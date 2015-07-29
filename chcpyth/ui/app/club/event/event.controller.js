(function() {
  'use strict';

  angular.module('app.club.event')

  .controller('ClubEventController', controller);

  controller.$inject = ['$scope',  'Helpers', '$location',
    'ExceptionHandler', 'Event', 'Storage', '$modal'];

  function controller($scope, Helpers, $location,
    ExceptionHandler, Event, Storage, $modal) {
    var vm = this;

    var handler = ExceptionHandler;

    vm.showProfile = showProfile;
    vm.club = Storage.getClub();
    vm.activate = activate;
    $scope.loadEvents = loadEvents;

    // This function will be called after a new event has been created.
    // It will be called inside a event profile modal.
    $scope.onCreateSuccess = onCreateSuccess;

    // Reload photos after upload modal closed.
    $scope.$on('modal.hide',function(){
      loadEvents();
    });


    vm.eventProfileModal = $modal ({
      scope: $scope,
      template: 'app/event/profile/profile.modal.html',
      show: false,
      placement: 'center'
    });

    vm.events = [];

    vm.activate();

    // The startup function.
    function activate() {
      Helpers.safeGetLoginMember(vm);

      if ($.isEmptyObject(vm.member)) {
        $location.path('/home');
        return;
      }

      loadEvents();
    }

    function showProfile() {
      vm.eventProfileModal.show();
    }

    function onCreateSuccess() {
      vm.eventProfileModal.hide();
    }

    function loadEvents() {
      // Pull general events of the current selected club.
      if (!$.isEmptyObject(vm.club)) {
        Event.get({ club__ref: vm.club.ref }).$promise
        .then(setEvents)
        .catch(handler.generalHandler);
      }
    }

    // Private functions.

    function setEvents(eventResource) {
      vm.events = eventResource.objects;
    }
  }
})();
