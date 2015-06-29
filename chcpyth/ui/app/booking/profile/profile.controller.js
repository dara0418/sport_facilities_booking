(function() {
  'use strict';

  angular.module('app.booking.profile')

  .controller('BookingProfileController', profileController);

  profileController.$inject = ['$scope', '$translate', 'Helpers', 'ExceptionHandler',
    'Booking', 'Status'];

  function profileController($scope, $translate, Helpers, ExceptionHandler,
    Booking, Status) {
    var vm = this;

    var handler = ExceptionHandler;

    vm.activate = activate;
    vm.remove = remove;
    vm.booking = $scope.booking;
    vm.stu = Status;

    vm.activate();

    // The startup function.
    function activate() {
      Helpers.safeGetLoginMember(vm);
    }

    function create() {
      var booking = vm.booking;

      if (!$.isEmptyObject(booking.ref)) {
        // The booking has a ref, it may be an existing booking.
        return;
      }

      new Booking(booking).$save()
      .then(Helpers.saveSuccess)
      .catch(handler.generalHandler);
    }

    function remove() {
      var booking = vm.booking;

      if ($.isEmptyObject(booking.ref)) {
        // No ref, quit.
        return;
      }

      new Booking(booking).$delete()
      .then(Helpers.deleteSuccess)
      .catch(handler.generalHandler);
    }
  }
})();
