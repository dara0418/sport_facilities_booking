(function() {
  'use strict';

  angular.module('app.booking.club_dashboard')

  .controller('BookingClubDashboardController', dashboardController);

  dashboardController.$inject = ['$scope', 'Notification', '$translate', 'Club',
    'Helpers', 'SharedProperties', 'Membership', '$location', 'ExceptionHandler',
    'Booking', 'MembershipRole'];

  function dashboardController($scope, Notification, $translate, Club,
    Helpers, SharedProperties, Membership, $location, ExceptionHandler,
    Booking, MembershipRole) {
    var vm = this;

    var handler = ExceptionHandler;

    // TODO - Save the role into sessionStorage for easy access.
    vm.mRole = MembershipRole;
    vm.editBooking = editBooking;
    vm.activate = activate;

    vm.bookings = [];

    vm.activate();

    // The startup function.
    function activate() {
      Helpers.safeGetLoginMember(vm);

      vm.selectedClub = angular.copy(SharedProperties.selectedClub);

      // Pull bookings of the current selected club.
      if (!$.isEmptyObject(vm.selectedClub)) {
        Booking.get({ facility__club__ref: vm.selectedClub.ref }).$promise
        .then(setBookings)
        .catch(handler.generalHandler);

        Helpers.getMembershipsByClubAndMember(vm.member.ref, vm.selectedClub.ref)
        .then(setClubRole)
        .catch(handler.generalHandler);
      }
    }

    function editBooking(booking) {
      if ($.isEmptyObject(booking)) {
        // No booking selected, quit.
        return;
      }

      SharedProperties.selectedBooking = booking;

      $location.path('/booking/profile');
    }

    // Private functions.

    function setBookings(bookingResource) {
      vm.bookings = bookingResource.objects;
    }

    function setClubRole(memberships) {
      if (memberships.length == 1) {
        vm.role = memberships[0].role;
      }
    }
  }
})();
