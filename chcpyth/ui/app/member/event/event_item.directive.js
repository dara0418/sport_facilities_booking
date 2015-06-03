(function() {
  'use strict';

  angular.module('app.member.event')

  .directive('memberEventItem', memberEventItem);

  function memberEventItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/member/event/event_item.html',
      controller: 'MemberEventItemController',
      controllerAs: 'vm',
      scope: {
        event: '=',
		hasCompleted: '@'
      }
    };

    return directive;
  }
})();
