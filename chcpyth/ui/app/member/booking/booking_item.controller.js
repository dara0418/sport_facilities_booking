(function() {
  'use strict';

  angular.module('app.member.booking')

  .controller('MemberBookingItemController', bookingItemController);

  bookingItemController.$inject = ['$scope', '$location', '$translate',
    'Helpers', 'ExceptionHandler', 'Storage', 'ClubPicture'];

  function bookingItemController($scope, $location, $translate,
    Helpers, ExceptionHandler, Storage, ClubPicture) {
    var vm = this;

    vm.booking = $scope.booking;
    vm.activate = activate;
    vm.selectBooking = selectBooking;
    vm.clubImg = '';

    var handler = ExceptionHandler;

    vm.activate();

    function activate() {
      // Check if user already signed in.
      Helpers.safeGetLoginMember(vm);

      if ($.isEmptyObject(vm.member)) {
        $location.path('/landing');
      }

      var address = vm.booking.facility.club.address;
      var addressStr = address.line1 + ' ' + address.line2 + ', ' +
        address.city + ', ' + address.province + ', ' + address.country;
      vm.booking.addressStr = addressStr;

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

    function selectBooking(booking) {
      Storage.setBooking(booking);
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
