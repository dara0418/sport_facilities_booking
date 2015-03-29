(function() {
  'use strict';

  angular.module('app.event.club_dashboard')

  .controller('EventClubDashboardController', dashboardController);

  dashboardController.$inject = ['$scope', 'Notification', '$translate', 'Club',
    'Helpers', 'SharedProperties', 'Membership', '$location', 'ExceptionHandler',
    'Event', 'MembershipRole'];

  function dashboardController($scope, Notification, $translate, Club,
    Helpers, SharedProperties, Membership, $location, ExceptionHandler,
    Event, MembershipRole) {
    var vm = this;

    var handler = ExceptionHandler;

    // TODO - Save the role into sessionStorage for easy access.
    vm.mRole = MembershipRole;
    vm.createEvent = createEvent;
    vm.editEvent = editEvent;
    vm.activate = activate;

    vm.events = [];

    vm.activate();

    // The startup function.
    function activate() {
      Helpers.safeGetLoginMember(vm);

      vm.selectedClub = angular.copy(SharedProperties.selectedClub);

      // Pull general events of the current selected club.
      if (!$.isEmptyObject(vm.selectedClub)) {
        Event.get({ club__ref: vm.selectedClub.ref }).$promise
        .then(setEvents)
        .catch(handler.generalHandler);

        Helpers.getMembershipsByClubAndMember(vm.member.ref, vm.selectedClub.ref)
        .then(setClubRole)
        .catch(handler.generalHandler);
      }
    }

    function editEvent(event) {
      if ($.isEmptyObject(event)) {
        // No event selected, quit.
        return;
      }

      SharedProperties.selectedEvent = event;

      $location.path('/event/profile');
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
