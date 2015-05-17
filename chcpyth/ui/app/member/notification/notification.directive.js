(function() {
  'use strict';

  angular.module('app.member.notification')

  .directive('memberNotification', memberNotification);

  function memberNotification() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/member/notification/notification.html',
      controller: 'MemberNotificationController',
      controllerAs: 'vm',
      scope: {}
    };

    return directive;
  }
})();
