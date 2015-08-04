(function() {
  'use strict';

  angular.module('app.membership.invitation')

  .directive('membershipInvitationItem', membershipInvitationItem);

  function membershipInvitationItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/membership/invitation/invitation_item.html',
      controller: 'MembershipInvitationItemController',
      controllerAs: 'vm',
      scope: {
        member: '=',
        club: '='
      }
    };

    return directive;
  }
})();
