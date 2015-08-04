(function() {
  'use strict';

  angular.module('app.membership.invitation')

  .directive('membershipInvitation', membershipInvitation);

  function membershipInvitation() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/membership/invitation/invitation.html',
      controller: 'MembershipInvitationController',
      controllerAs: 'vm',
      scope: {}
    };

    return directive;
  }
})();
