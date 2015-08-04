(function() {
  'use strict';

  angular.module('app.member.profile')

  .directive('memberProfileView', memberProfileView);

  function memberProfileView() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/member/profile/profile_view.html',
      controller: 'MemberProfileViewController',
      controllerAs: 'vm',
      scope: {
        member: '='
      }
    };

    return directive;
  }
})();
