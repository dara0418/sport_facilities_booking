(function() {
  'use strict';

  angular.module('app.booking.profile')

  .controller('BookingProfileController', profileController);

  profileController.$inject = ['$scope', 'Notification', '$translate', 'Club',
    'Helpers', 'SharedProperties', 'Membership', '$location', 'ExceptionHandler',
    'Booking', 'MembershipRole'];

  function profileController($scope, Notification, $translate, Club,
    Helpers, SharedProperties, Membership, $location, ExceptionHandler,
    Booking, MembershipRole) {
    var vm = this;

    var handler = ExceptionHandler;

    vm.mRole = MembershipRole;
    vm.activate = activate;
    vm.update = update;
    vm.remove = remove;

    vm.activate();

    // The startup function.
    function activate() {
      Helpers.safeGetLoginMember(vm);

      if (!$.isEmptyObject(SharedProperties.selectedBooking)) {
        vm.booking = angular.copy(SharedProperties.selectedBooking);

        // Clear selectedBooking.
        SharedProperties.selectedBooking = undefined;
      }
    }

    function update() {
      if ($.isEmptyObject(vm.booking.ref)) {
        // No ref, quit.
        return;
      }

      // TODO - Research the underlying actions of creating a resource with foreign key
      // relationship in Tastypie. Passing facility object directly will toggle an 'UNIQUE'
      // constraint, which is not we want.
      vm.booking.facility = vm.booking.facility.resource_uri;

      new Booking(vm.booking).$update()
      .then(Helpers.updateSuccess)
      .catch(handler.generalHandler);
    }

    function create() {
      if (!$.isEmptyObject(vm.booking.ref)) {
        // The booking has a ref, it may be an existing booking.
        return;
      }

      new Booking(vm.booking).$save()
      .then(Helpers.saveSuccess)
      .catch(handler.generalHandler);
    }

    function remove() {
      if ($.isEmptyObject(vm.booking.ref)) {
        // No ref, quit.
        return;
      }

      new Booking(vm.booking).$delete()
      .then(Helpers.deleteSuccess)
      .catch(handler.generalHandler);
    }
  }
})();
