(function() {
  'use strict';

  angular.module('app.club.member')

  .directive('clubMember', clubMember);

  function clubMember() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/club/member/member.html',
      controller: 'ClubMemberController',
      controllerAs: 'vm',
      scope: {
        club: '='
      }
    };

    return directive;
  }
})();
