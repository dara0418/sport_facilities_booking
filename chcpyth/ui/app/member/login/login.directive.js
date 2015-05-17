(function() {
  'use strict';

  angular.module('app.member.login')

  .directive('loginPlugin', loginPlugin);

  function loginPlugin() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/member/login/login_plugin.html',
      controller: 'MemberLoginController',
      controllerAs: 'vm',
      scope: {}
    };

    return directive;
  }
})();
