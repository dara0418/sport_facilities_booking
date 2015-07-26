(function() {
  'use strict';

  angular.module('app.club.event')

  .directive('clubEvent', clubEvent);

  function clubEvent() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/club/event/event.html',
      controller: 'ClubEventController',
      controllerAs: 'vm',
      scope: { }
    };

    return directive;
  }
})();
