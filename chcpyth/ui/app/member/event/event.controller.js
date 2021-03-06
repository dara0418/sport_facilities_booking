(function() {
  'use strict';

  angular.module('app.member.event')

  .controller('MemberEventController', eventController);

  eventController.$inject = ['$scope', 'ExceptionHandler', 'Helpers', 'Event',
    '$q', 'EventReg'];

  function eventController($scope, ExceptionHandler, Helpers, Event,
    $q, EventReg) {
    var vm = this;

    vm.activate = activate;
    vm.events = [];
    vm.h = Helpers;
    $scope.attachEventRegStatus = attachEventRegStatus;

    var handler = ExceptionHandler;

    vm.activate();

    function activate() {
      // Check if user already signed in.
      Helpers.safeGetLoginMember(vm);

      if ($.isEmptyObject(vm.member)) {
        $location.path('/member/login');
      }

      // Pull events of the current login member.
      if (!$.isEmptyObject(vm.member)) {
        Helpers.getClubsByMemberRef(vm.member.ref)
        .then(getEventsByClubs)
        .then(combineEvents)
        .then(attachEventRegStatus)
        .catch(handler.generalHandler);
      }
    }

    // Private functions.

    function getEventsByClubs(clubs) {
      var promises = $.map(clubs, function(club, index) {
        return Event.get({ club__ref: club.ref }).$promise;
      });

      return promises;
    }

    // Combine the events.
    function combineEvents(promises) {
      var deferred = $q.defer();
      var cnt = 0;

      $.each(promises, function(index, promise) {
        promise.then(function(eventResource) {
          vm.events = vm.events.concat(eventResource.objects);
          cnt += 1;

          if (cnt == promises.length) {
            deferred.resolve();
          }
        });
      });

      return deferred.promise;
    }

    function attachEventRegStatus() {
      $.each(vm.events, function(index, event) {
        EventReg.get({
          event__ref: event.ref,
          member_ref: vm.member.ref
        }).$promise
        .then(function(eventRegResource) {
          event.hasJoined = eventRegResource.objects.length > 0;
        });
      });
    }
  }
})();
