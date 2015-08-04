(function() {
  'use strict';

  angular.module('app.membership.invitation')

  .controller('MembershipInvitationItemController', controller);

  controller.$inject = ['$scope', '$location', 'Helpers', 'ExceptionHandler',
    'Storage', 'MembershipRequest', 'Notification'];

  function controller($scope, $location, Helpers, ExceptionHandler,
    Storage, MembershipRequest, Notification) {
    var vm = this;

    vm.member = $scope.member;
    vm.club = $scope.club;
    vm.activate = activate;
    vm.inviteMember = inviteMember;

    var handler = ExceptionHandler;

    vm.activate();

    function activate() {
      // Don't check login in this controller, it will change the vm.member value.

      vm.avatarSrc = (!$.isEmptyObject(vm.member.avatar) ?
        vm.member.avatar :
        'images/profile-img.jpg');
    }

    function inviteMember(content) {
      console.log(content);

      new MembershipRequest({
        member: vm.member,
        club: vm.club,
        request_type: 'CI', // Club invitation.
        status: 'P', // Pending.
        content: content
      }).$save()
      .then(inviteSuccess)
      .catch(handler.generalHandler);
    }

    // Private functions.

    function inviteSuccess() {
      Notification.notifySuccess('INVITE_SUCCESS');
    }
  }
})();
