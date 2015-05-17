(function() {
  'use strict';

  angular.module('app.member.event')

  .directive('memberEvent', memberEvent);

  function memberEvent() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/member/event/event.html',
      controller: 'MemberEventController',
      controllerAs: 'vm',
      scope: {}
    };

    return directive;
  }
})();
