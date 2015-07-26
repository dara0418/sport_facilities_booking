(function() {
  'use strict';

  angular.module('app.club.event')

  .directive('clubEventItem', clubEventItem);

  function clubEventItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/club/event/event_item.html',
      controller: 'ClubEventItemController',
      controllerAs: 'vm',
      scope: {
        event: '=',
        hasCompleted: '@'
      }
    };

    return directive;
  }
})();
