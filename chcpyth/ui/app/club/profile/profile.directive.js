(function() {
  'use strict';

  angular.module('app.club.profile')

  .directive('clubProfile', clubProfile);

  function clubProfile() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/club/profile/profile.html',
      controller: 'ClubProfileController',
      controllerAs: 'vm',
      scope: {
        club: '='
      }
    };

    return directive;
  }
})();
