(function() {
  'use strict';

  angular.module('app.club.event')

  .controller('ClubEventItemController', controller);

  controller.$inject = ['$scope', '$location', '$translate',
    'Helpers', 'ExceptionHandler', 'Storage'];

  function controller($scope, $location, $translate,
    Helpers, ExceptionHandler, Storage) {
    var vm = this;

    vm.event = $scope.event;
    vm.activate = activate;
    vm.hasCompleted = $scope.hasCompleted;
    vm.viewProfile = viewProfile;
    vm.cancelEvent = cancelEvent;

    var handler = ExceptionHandler;

    vm.activate();

    function activate() {
      // Check if user already signed in.
      Helpers.safeGetLoginMember(vm);

      if ($.isEmptyObject(vm.member)) {
        $location.path('/home');
      }

      // Calculate event start&end date.
      var startDate = new Date(vm.event.start);
      vm.startDay = startDate.getDate();
      vm.startMonth = Helpers.getMonthStr(startDate.getMonth());
      vm.startYear = startDate.getFullYear();
      vm.startDow = Helpers.getDayOfWeekStr(startDate.getDay()); // Day of week.

      var endDate = new Date(vm.event.start);
      vm.endDay = endDate.getDate();
      vm.endMonth = Helpers.getMonthStr(endDate.getMonth());
      vm.endYear = endDate.getFullYear();
      vm.endDow = Helpers.getDayOfWeekStr(endDate.getDay()); // Day of week.
    }

    function viewProfile() {
    }

    function cancelEvent() {
    }
  }
})();
