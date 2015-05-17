(function() {
  'use strict';

  angular.module('app.member.password')

  .directive('memberPassword', memberPassword);

  function memberPassword() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/member/password/password.html',
      controller: 'MemberPasswordController',
      controllerAs: 'vm',
      scope: {}
    };

    return directive;
  }
})();
