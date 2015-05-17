(function() {
  'use strict';

  angular.module('app.event.profile')

  .directive('eventProfile', eventProfile);

  function eventProfile() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/event/profile/profile.html',
      controller: 'EventProfileController',
      controllerAs: 'vm',
      scope: {}
    };

    return directive;
  }
})();
