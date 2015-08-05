(function() {
  'use strict';

  angular.module('app.member.notification')

  .directive('memberNotificationItem', memberNotificationItem);

  function memberNotificationItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/member/notification/notification_item.html',
      controller: 'MemberNotificationItemController',
      controllerAs: 'vm',
      scope: {
        notification: '='
      }
    };

    return directive;
  }
})();
