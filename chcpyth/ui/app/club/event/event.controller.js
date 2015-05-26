(function() {
  'use strict';

  angular.module('app.club.event')

  .controller('ClubEventController', controller);

  controller.$inject = ['$scope',  '$translate', 'Helpers',
    '$location', 'ExceptionHandler',
    'Event', 'MembershipRole'];

  function controller($scope,  $translate, Helpers,
    $location, ExceptionHandler, Event, MembershipRole) {
    var vm = this;

    var handler = ExceptionHandler;

    vm.mRole = MembershipRole;
    vm.createEvent = createEvent;
    vm.club = $scope.club;
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

        // Verify permission from database.
        Helpers.getMembershipsByClubAndMember(vm.member.ref, vm.club.ref)
        .then(setClubRole)
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

    function setClubRole(memberships) {
      if (memberships.length == 1) {
        vm.role = memberships[0].role;
      }
    }
  }
})();
