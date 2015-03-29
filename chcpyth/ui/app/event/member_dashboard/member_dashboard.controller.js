(function() {
  'use strict';

  angular.module('app.event.member_dashboard')

  .controller('EventMemberDashboardController', dashboardController);

  dashboardController.$inject = ['$scope', 'Notification', '$translate', 'Club',
    'Helpers', 'SharedProperties', 'Membership', '$location', 'ExceptionHandler',
    'Event', 'EventReg', 'MembershipRole', '$q'];

  function dashboardController($scope, Notification, $translate, Club,
    Helpers, SharedProperties, Membership, $location, ExceptionHandler,
    Event, EventReg, MembershipRole, $q) {
    var vm = this;

    var handler = ExceptionHandler;

    // TODO - Save the role into sessionStorage for easy access.
    vm.mRole = MembershipRole;
    vm.activate = activate;
    vm.joinEvent = joinEvent;
    vm.quitEvent = quitEvent;

    vm.events = [];

    vm.activate();

    // The startup function.
    function activate() {
      Helpers.safeGetLoginMember(vm);

      // Pull events of the current login member.
      if (!$.isEmptyObject(vm.member)) {
        Helpers.getClubsByMemberRef(vm.member.ref)
        .then(getEventsByClubs)
        .then(combineEvents)
        .then(attachEventRegStatus)
        .catch(handler.generalHandler);
      }
    }

    function joinEvent(event) {
      var eventReg = {
        member: vm.member,
        event: event.resource_uri
      };

      new EventReg(eventReg).$save()
      .then(Helpers.saveSuccess)
      .catch(handler.generalHandler);
    }

    function quitEvent(event) {
      EventReg.get({
        event__ref: event.ref,
        member_ref: vm.member.ref
      }).$promise
      .then(function(eventRegResource) {
        return eventRegResource.$delete();
      })
      .then(Helpers.deleteSuccess)
      .catch(handler.generalHandler);
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

      $.each(promises, function(index, promise) {
        promise.then(function(eventResource) {
          vm.events = vm.events.concat(eventResource.objects);

          if (index == promises.length - 1) {
            deferred.resolve();
          }
        });
      });

      return deferred.promise;
    }

    // TODO - Load the registration status from the Event GET request.
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
