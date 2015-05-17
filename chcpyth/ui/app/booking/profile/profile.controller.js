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
    vm.unselectBooking = unselectBooking;
    vm.sharedProperties = SharedProperties;

    vm.activate();

    // The startup function.
    function activate() {
      Helpers.safeGetLoginMember(vm);
    }

    function update() {
      var booking = SharedProperties.selectedBooking;

      if ($.isEmptyObject(booking.ref)) {
        // No ref, quit.
        return;
      }

      // TODO - Research the underlying actions of creating a resource with foreign key
      // relationship in Tastypie. Passing facility object directly will toggle an 'UNIQUE'
      // constraint, which is not we want.
      booking.facility = booking.facility.resource_uri;

      new Booking(booking).$update()
      .then(Helpers.updateSuccess)
      .catch(handler.generalHandler);
    }

    function create() {
      var booking = SharedProperties.selectedBooking;

      if (!$.isEmptyObject(booking.ref)) {
        // The booking has a ref, it may be an existing booking.
        return;
      }

      new Booking(booking).$save()
      .then(Helpers.saveSuccess)
      .catch(handler.generalHandler);
    }

    function remove() {
      var booking = SharedProperties.selectedBooking;

      if ($.isEmptyObject(booking.ref)) {
        // No ref, quit.
        return;
      }

      new Booking(booking).$delete()
      .then(Helpers.deleteSuccess)
      .catch(handler.generalHandler);
    }

    function unselectBooking() {
      SharedProperties.selectedBooking = undefined;
    }
  }
})();
