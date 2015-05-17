(function() {
  'use strict';

  angular.module('app.club.booking')

  .controller('ClubBookingController', controller);

  controller.$inject = ['$scope', '$translate', 'Helpers', '$location',
    'ExceptionHandler', 'Booking', 'BookingMember', '$q'];

  function controller($scope, $translate, Helpers, $location,
    ExceptionHandler, Booking, BookingMember, $q) {
    var vm = this;

    var handler = ExceptionHandler;

    vm.club = $scope.club;
    vm.activate = activate;

    vm.bookings = [];

    vm.activate();

    // The startup function.
    function activate() {
      Helpers.safeGetLoginMember(vm);

      // Pull bookings of the current selected club.
      if (!$.isEmptyObject(vm.club)) {
        Booking.get({ facility__club__ref: vm.club.ref }).$promise
        .then(attachBookingMembers)
        .then(setBookings)
        .catch(handler.generalHandler);
      }
    }

    // Private functions.

    // This function attaches booking members to the booking objects.
    // Two attribute will be attached for display purpose: booker and members.
    // "booker" is the booker of reservation.
    // "members" is a string display all members in the reservation.
    function attachBookingMembers(bookingResource) {
      var bookingDeferred = $q.defer();

      // Look up all members of the booking by BookingMember resource,
      // and map them into a deferred promise that can be resolved
      // after all AJAX calls done.
      var bookings = $.map(bookingResource.objects, function(booking, index) {
        return BookingMember.get({ booking__ref: booking.ref }).$promise
        .then(function(bookingMemberResource) {
          booking.members = '';

          $.each(bookingMemberResource.objects, function(index, bMember) {
            if (bMember.is_booker) {
              booking.booker = bMember.member.email;
            }

            booking.members += bMember.member.email + ' ';
          });

          return booking;
        });
      });

      // Resolve the promise after all AJAX calls done.
      $q.all(bookings).then(function(data) {
        bookingDeferred.resolve(data);
      });

      return bookingDeferred.promise;
    }

    function setBookings(bookings) {
      vm.bookings = bookings;
    }
  }
})();
