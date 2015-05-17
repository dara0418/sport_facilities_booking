(function() {
  'use strict';

  angular.module('app.member.club')

  .directive('memberClub', memberClub);

  function memberClub() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/member/club/club.html',
      controller: 'MemberClubController',
      controllerAs: 'vm',
      scope: {}
    };

    return directive;
  }
})();
