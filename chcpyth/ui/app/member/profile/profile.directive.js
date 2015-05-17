(function() {
  'use strict';

  angular.module('app.member.profile')

  .directive('memberProfile', memberProfile);

  function memberProfile() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/member/profile/profile.html',
      controller: 'MemberProfileController',
      controllerAs: 'vm',
      scope: {}
    };

    return directive;
  }
})();
