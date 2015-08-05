(function() {
  'use strict';

  angular.module('app.member.notification')

  .controller('MemberNotificationItemController', controller);

  controller.$inject = ['$scope', '$location', 'Helpers', 'ExceptionHandler',
    'MembershipRequest', 'Notification', 'Membership', '$rootScope'];

  function controller($scope, $location, Helpers, ExceptionHandler,
    MembershipRequest, Notification, Membership, $root) {
    var vm = this;

    vm.activate = activate;
    vm.notification = $scope.notification;
    vm.acceptInvitation = acceptInvitation;
    vm.ignoreInvitation = ignoreInvitation;
    vm.rejectInvitation = rejectInvitation;

    // This could be a membership request object, an even object or
    // a system notification object.
    vm.content = vm.notification.content;

    var handler = ExceptionHandler;

    vm.activate();

    function activate() {
      // Check if user already signed in.
      Helpers.safeGetLoginMember(vm);

      if ($.isEmptyObject(vm.member)) {
        $location.path('/home');
        return;
      }
    }

    function acceptInvitation() {
      if (vm.notification.isMembershipRequest) {
        vm.content.status = 'A';
        vm.notification.hasRead = true;

        new MembershipRequest(vm.content).$update()
        .then(createMembership)
        .then(acceptInvitationSuccess)
        .catch(handler.generalHandler);
      }
    }

    function ignoreInvitation() {
      if (vm.notification.isMembershipRequest) {
        vm.content.status = 'I';
        vm.notification.hasRead = true;

        new MembershipRequest(vm.content).$update()
        .then(ignoreInvitationSuccess)
        .catch(handler.generalHandler);
      }
    }

    function rejectInvitation() {
      if (vm.notification.isMembershipRequest) {
        vm.content.status = 'R';
        vm.notification.hasRead = true;

        new MembershipRequest(vm.content).$update()
        .then(rejectInvitationSuccess)
        .catch(handler.generalHandler);
      }
    }

    // Private functions.

    function createMembership() {
      return new Membership({
        member: vm.member,
        club: vm.content.club,
        role: 'M'
      }).$save()
    }

    function acceptInvitationSuccess() {
      $root.$broadcast('membership.created');

      Notification.notifySuccess('ACCEPTED_INVITATION');
    }

    function ignoreInvitationSuccess() {
      Notification.notifySuccess('IGNORED_INVITATION');
    }

    function rejectInvitationSuccess() {
      Notification.notifySuccess('REJECTED_INVITATION');
    }
  }
})();
