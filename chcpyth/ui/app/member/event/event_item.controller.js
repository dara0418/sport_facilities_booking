(function() {
  'use strict';

  angular.module('app.member.event')

  .controller('MemberEventItemController', eventItemController);

  eventItemController.$inject = ['$scope', '$location', '$translate',
    'Helpers', 'ExceptionHandler', 'ClubPicture', 'EventReg', 'Notification'];

  function eventItemController($scope, $location, $translate,
    Helpers, ExceptionHandler, ClubPicture, EventReg, Notification) {
    var vm = this;

    vm.event = $scope.event;
    vm.hasCompleted = $scope.hasCompleted;
    vm.joinEvent = joinEvent;
    vm.quitEvent = quitEvent;
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

      var endDate = new Date(vm.event.end);
      vm.endDay = endDate.getDate();
      vm.endMonth = Helpers.getMonthStr(endDate.getMonth());
      vm.endYear = endDate.getFullYear();
      vm.endDow = Helpers.getDayOfWeekStr(endDate.getDay()); // Day of week.
    }

    function joinEvent(event) {
      var eventReg = {
        member: vm.member,
        event: event.resource_uri
      };

      new EventReg(eventReg).$save()
      .then(onJoinEvent)
      .catch(handler.generalHandler);
    }

    function quitEvent(event) {
      EventReg.get({
        event__ref: event.ref,
        member_ref: vm.member.ref
      }).$promise
      .then(function(eventRegResource) {
        if (eventRegResource.objects.length == 1) {
          new EventReg(eventRegResource.objects[0]).$delete()
          .then(onQuitEvent)
        }
      })
      .catch(handler.generalHandler);
    }


    function setClubPicture(resource) {
      if ($.isEmptyObject(resource.objects) || resource.objects.length == 0) {
        vm.clubImg = 'images/profile-img.jpg';
      }
      else {
        vm.clubImg = resource.objects[0].url;
      }
    }

    function onJoinEvent() {
      $scope.$parent.$parent.attachEventRegStatus();

      Notification.notifySuccess('REGISTER_EVENT');
    }

    function onQuitEvent() {
      $scope.$parent.$parent.attachEventRegStatus();

      Notification.notifySuccess('UNREGISTER_EVENT');
    }
  }
})();
