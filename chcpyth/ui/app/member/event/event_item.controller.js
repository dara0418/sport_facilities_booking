(function() {
  'use strict';

  angular.module('app.member.event')

  .controller('MemberEventItemController', eventItemController);

  eventItemController.$inject = ['$scope', '$location', '$translate',
    'Helpers', 'ExceptionHandler', 'ClubPicture'];

  function eventItemController($scope, $location, $translate,
    Helpers, ExceptionHandler, ClubPicture) {
    var vm = this;

    vm.event = $scope.event;
    vm.hasCompleted = $scope.hasCompleted;
    vm.activate = activate;

    var handler = ExceptionHandler;

    vm.activate();

    function activate() {
      // Check if user already signed in.
      Helpers.safeGetLoginMember(vm);

      if ($.isEmptyObject(vm.member)) {
        $location.path('/landing');
      }

      // Pull club pictures.
      var club = vm.event.club;
      ClubPicture.get({ club__ref: club.ref }).$promise
      .then(setClubPicture)
      .catch(handler.generalHandler);

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

    function setClubPicture(resource) {
      if ($.isEmptyObject(resource.objects) || resource.objects.length == 0) {
        vm.clubImg = 'images/profile-img.jpg';
      }
      else {
        vm.clubImg = resource.objects[0].url;
      }
    }
  }
})();
