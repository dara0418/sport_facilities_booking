(function() {
  'use strict';

  angular.module('app.member.booking')

  .controller('MemberBookingController', bookingController);

  bookingController.$inject = ['$scope', '$location', 'Notification', '$translate', 'Member',
    'Storage', 'Helpers', 'ExceptionHandler', 'Booking', 'BookingMember'];

  function bookingController($scope, $location, Notification, $translate, Member,
    Storage, Helpers, ExceptionHandler, Booking, BookingMember) {
    var vm = this;

    vm.activate = activate;
    vm.todayDate = new Date();
    vm.eventSources = [];
    vm.bookings = [];

    var handler = ExceptionHandler;

    vm.activate();

    function activate() {
      // Check if user already signed in.
      Helpers.safeGetLoginMember(vm);

      if ($.isEmptyObject(vm.member)) {
        $location.path('/member/login');
        return;
      }

      BookingMember.get({ member__ref: vm.member.ref }).$promise
        .then(setBookings)
        .catch(handler.generalHandler);
    }

    // Private functions.

    function setBookings(bookingMemberResource) {
      var bookingMembers = bookingMemberResource.objects;

      $.each(bookingMembers, function(index, bm) {
        vm.bookings.push(bm.booking);
      });
    }
  }
})();
