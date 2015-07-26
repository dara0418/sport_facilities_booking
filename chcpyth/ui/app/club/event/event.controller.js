(function() {
  'use strict';

  angular.module('app.club.event')

  .controller('ClubEventController', controller);

  controller.$inject = ['$scope',  '$translate', 'Helpers',
    '$location', 'ExceptionHandler', 'Event', 'MembershipRole',
    'Storage'];

  function controller($scope,  $translate, Helpers,
    $location, ExceptionHandler, Event, MembershipRole,
    Storage) {
    var vm = this;

    var handler = ExceptionHandler;

    vm.mRole = MembershipRole;
    vm.createEvent = createEvent;
    vm.club = Storage.getClub();
    vm.activate = activate;

    vm.events = [];

    vm.activate();

    // The startup function.
    function activate() {
      Helpers.safeGetLoginMember(vm);

      // Pull general events of the current selected club.
      if (!$.isEmptyObject(vm.club)) {
        Event.get({ club__ref: vm.club.ref }).$promise
        .then(setEvents)
        .catch(handler.generalHandler);
      }
    }

    function createEvent() {
      // Clear selectedEvent.
      SharedProperties.selectedEvent = undefined;

      $location.path('/event/profile');
    }

    // Private functions.

    function setEvents(eventResource) {
      vm.events = eventResource.objects;
    }
  }
})();
