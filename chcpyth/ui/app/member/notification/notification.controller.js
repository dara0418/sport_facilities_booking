(function() {
  'use strict';

  angular.module('app.member.notification')

  .controller('MemberNotificationController', notificationController);

  notificationController.$inject = ['$scope', 'Helpers', '$location',
    'MembershipRequest', 'ExceptionHandler'];

  function notificationController($scope, Helpers, $location,
    MembershipRequest, handler) {
    var vm = this;

    vm.activate = activate;
    vm.notifications = [];
    vm.newNotifications = 0;

    $scope.$on('membership.created', function() {
      loadNotifications();
    });

    vm.activate();

    function activate() {
      // Check if user already signed in.
      Helpers.safeGetLoginMember(vm);

      if ($.isEmptyObject(vm.member)) {
        $location.path('/home');
        return;
      }

      loadNotifications();
    }

    // Private functions.

    function loadNotifications() {
      vm.notifications = [];
      vm.newNotifications = 0;

      loadMembershipRequests();
    }

    function loadMembershipRequests() {
      // Get all pending membership requests.
      MembershipRequest.get({ member__ref: vm.member.ref }).$promise
      .then(setMembershipReqs)
      .catch(handler.generalHandler);
    }

    // Wrap the membership request object into a "notification" object.
    function setMembershipReqs(resource) {
      var msqs = resource.objects;

      $.each(msqs, function(index, msq) {
        var notification = {
          isMembershipRequest: true,
          isEvent: false,
          hasRead: msq.status != 'P',
          content: msq
        }

        vm.notifications.push(notification);

        if (!notification.hasRead) {
          vm.newNotifications += 1;
        }
      });

      $scope.$emit('notification.new', vm.newNotifications);
    }
  }
})();
