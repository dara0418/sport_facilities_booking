(function() {
  'use strict';

  angular.module('app.member.event')

  .controller('MemberEventItemController', eventItemController);

  eventItemController.$inject = ['$scope', '$location', '$translate',
    'Helpers', 'ExceptionHandler', 'SharedProperties'];

  function eventItemController($scope, $location, $translate,
    Helpers, ExceptionHandler, SharedProperties) {
    var vm = this;

    vm.event = $scope.event;
    vm.activate = activate;
    vm.selectBooking = selectBooking;

    var handler = ExceptionHandler;

    vm.activate();

    function activate() {
      // Check if user already signed in.
      Helpers.safeGetLoginMember(vm);

      if ($.isEmptyObject(vm.member)) {
        $location.path('/member/login');
      }
    }

    function selectBooking(event) {
      SharedProperties.selectedEvent = event;
    }
  }
})();
