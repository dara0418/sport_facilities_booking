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
    vm.h = Helpers;

    var handler = ExceptionHandler;

    $scope.renderCalendar = renderCalendar;

    vm.calendar = {
      height: 450,
      editable: false,
      header:{
        left: 'month basicWeek basicDay',
        center: 'title',
        right: 'today prev,next'
      }
    };

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

    function renderCalendar() {
      $scope.myCalendar.fullCalendar('render');
    }

    // Private functions.

    function setBookings(bookingMemberResource) {
      var bookingMembers = bookingMemberResource.objects;

      $.each(bookingMembers, function(index, bm) {
        // Set max allowed people of the booking.
        // TODO - Query general rule, club rule and facility rule
        //        to get the max allowed people of the booking.
        //        Currently just set to 30 to make things working and
        //        this will be changed later.
        bm.booking.maxAllowedPeople = 30;

        vm.bookings.push(bm.booking);
      });
    }
  }
})();
