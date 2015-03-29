(function() {
  'use strict';

  angular.module('app.event.profile')

  .controller('EventProfileController', profileController);

  profileController.$inject = ['$scope', 'Notification', '$translate', 'Club',
    'Helpers', 'SharedProperties', 'Membership', '$location', 'ExceptionHandler',
    'Event', 'MembershipRole'];

  function profileController($scope, Notification, $translate, Club,
    Helpers, SharedProperties, Membership, $location, ExceptionHandler,
    Event, MembershipRole) {
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

      if (!$.isEmptyObject(SharedProperties.selectedEvent)) {
        vm.event = angular.copy(SharedProperties.selectedEvent);

        // Clear selectedEvent.
        SharedProperties.selectedEvent = undefined;
      }
      else {
        vm.event = { club: SharedProperties.selectedClub };
      }
    }

    function update() {
      if ($.isEmptyObject(vm.event.ref)) {
        // No ref, quit.
        return;
      }

      new Event(vm.event).$update()
      .then(Helpers.updateSuccess)
      .catch(handler.generalHandler);
    }

    function create() {
      if (!$.isEmptyObject(vm.event.ref)) {
        // The event has a ref, it may be an existing event.
        return;
      }

      new Event(vm.event).$save()
      .then(Helpers.saveSuccess)
      .catch(handler.generalHandler);
    }

    function remove() {
      if ($.isEmptyObject(vm.event.ref)) {
        // No ref, quit.
        return;
      }

      new Event(vm.event).$delete()
      .then(Helpers.deleteSuccess)
      .catch(handler.generalHandler);
    }
  }
})();
