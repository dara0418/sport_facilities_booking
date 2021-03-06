(function() {
  'use strict';

  angular.module('app.member.login')

  .directive('memberLogin', memberLogin);

  function memberLogin() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/member/login/login.html',
      controller: 'MemberLoginController',
      controllerAs: 'vm',
      scope: {}
    };

    return directive;
  }
})();
