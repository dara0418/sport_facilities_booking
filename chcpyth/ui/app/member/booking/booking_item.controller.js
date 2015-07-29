(function() {
  'use strict';

  angular.module('app.member.booking')

  .controller('MemberBookingItemController', bookingItemController);

  bookingItemController.$inject = ['$scope', '$location', '$translate',
    'Helpers', 'ExceptionHandler', 'ClubPicture', '$modal', 'Booking',
    'Status'];

  function bookingItemController($scope, $location, $translate,
    Helpers, ExceptionHandler, ClubPicture, $modal, Booking,
    Status) {
    var vm = this;

    vm.booking = $scope.booking;
    vm.hasCompleted = $scope.hasCompleted;
    vm.activate = activate;
    vm.viewProfile = viewProfile;
    vm.cancelBooking = cancelBooking;
    vm.clubImg = '';
    vm.update = update;
    vm.stu = Status;

    vm.bookingProfileModal = $modal ({
      scope: $scope,
      template: 'app/booking/profile/profile.modal.html',
      show: false,
      placement: 'center'
    });

    var handler = ExceptionHandler;

    vm.activate();

    function activate() {
      // Check if user already signed in.
      Helpers.safeGetLoginMember(vm);

      if ($.isEmptyObject(vm.member)) {
        $location.path('/home');
      }

      var address = vm.booking.facility.club.address;
      vm.addressStr = address.line1 + ' ' + address.line2 + ', ' +
        address.city + ', ' + address.province;

      // The country code.
      vm.country = address.country;

      // Pull club pictures.
      var club = vm.booking.facility.club;
      ClubPicture.get({ club__ref: club.ref }).$promise
      .then(setClubPicture)
      .catch(handler.generalHandler);

      // Calculate checkin date&time.
      var date = new Date(vm.booking.booking_date);
      var timeslot = vm.booking.booking_timeslot;
      vm.day = date.getDate();
      vm.month = Helpers.getMonthStr(date.getMonth());
      vm.year = date.getFullYear();
      vm.dow = Helpers.getDayOfWeekStr(date.getDay()); // Day of week.
      vm.time = Helpers.getTimeslotStr(timeslot);

      // Duration.
      vm.timeUnit = Helpers.getTimeUnitStr(vm.booking.time_unit);
    }

    function update() {
      var booking = vm.booking;

      if ($.isEmptyObject(booking.ref)) {
        // No ref, quit.
        return;
      }

      // TODO - Research the underlying actions of creating a resource with foreign key
      // relationship in Tastypie. Passing facility object directly will toggle an 'UNIQUE'
      // constraint, which is not we want.
      var facility = booking.facility;
      booking.facility = booking.facility.resource_uri;

      Status.setStatusUpdating();

      // TODO - Verify the availability of the changes of booking.
      new Booking(booking).$update()
      .then(updateSuccess)
      .catch(handler.generalHandler);

      // Reset facility.
      booking.facility = facility;
    }

    function updateSuccess() {
      Helpers.updateSuccess();
      vm.bookingProfileModal.hide();

      Status.resetStatus();
    }

    function viewProfile() {
      // TODO - There's an exception thrown when showing the modal, it doesn't hurt the functions.
      //        Research the cause of exception.
      vm.bookingProfileModal.show();
    }

    function cancelBooking() {
      // TODO - To cancel booking, we shouldn't remove the booking object. Instead we
      //        should mark the booking status as canceled. We need to add a booking
      //        status field to the Booking model.
    }

    function setClubPicture(resource) {
      if ($.isEmptyObject(resource.objects) || resource.objects.length == 0) {
        // No club picture found, using default.
        // TODO - Change the picture in the future.
        vm.clubImg = 'images/profile-img.jpg';
      }
      else {
        // Found club pictures. Club may have multiple pictures.
        // But we always use the first one currently.
        // TODO - May set cover image for the club.
        vm.clubImg = resource.objects[0].url;
      }
    }
  }
})();
