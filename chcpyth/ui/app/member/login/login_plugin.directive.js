(function() {
  'use strict';

  angular.module('app.member.login')

  .directive('loginPlugin', loginPlugin);

  function loginPlugin() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/member/login/login_plugin.html',
      controller: 'LoginPluginController',
      controllerAs: 'vm',
      scope: {}
    };

    return directive;
  }
})();
