(function() {
  'use strict';

  angular.module('app.member.register')

  .directive('memberRegister', memberRegister);

  function memberRegister() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/member/register/register.html',
      controller: 'MemberRegisterController',
      controllerAs: 'vm',
      scope: {}
    };

    return directive;
  }
})();
