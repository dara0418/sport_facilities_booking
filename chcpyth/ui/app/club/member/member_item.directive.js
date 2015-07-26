(function() {
  'use strict';

  angular.module('app.club.member')

  .directive('clubMemberItem', clubMemberItem);

  function clubMemberItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/club/member/member_item.html',
      controller: 'ClubMemberItemController',
      controllerAs: 'vm',
      scope: {
        member: '='
      }
    };

    return directive;
  }
})();
