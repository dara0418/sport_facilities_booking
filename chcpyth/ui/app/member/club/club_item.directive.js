(function() {
  'use strict';

  angular.module('app.member.club')

  .directive('memberClubItem', memberClubItem);

  function memberClubItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/member/club/club_item.html',
      controller: 'MemberClubItemController',
      controllerAs: 'vm',
      scope: {
        club: '='
      }
    };

    return directive;
  }
})();
