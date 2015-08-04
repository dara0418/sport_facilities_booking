(function() {
  'use strict';

  angular.module('app.club.member')

  .controller('ClubMemberItemController', controller);

  controller.$inject = ['$scope', '$location', 'Helpers',
    'ExceptionHandler', 'Membership', 'Notification', 'Storage',
    '$modal'];

  function controller($scope, $location, Helpers,
    ExceptionHandler, Membership, Notification, Storage,
    $modal) {
    var vm = this;

    vm.membership = $scope.membership;
    vm.member = $scope.membership.member;
    vm.activate = activate;
    vm.showProfile = showProfile;
    vm.changeRole = changeRole;
    vm.removeMember = removeMember;

    var handler = ExceptionHandler;

    vm.memberProfileModal = $modal ({
      scope: $scope,
      template: 'app/member/profile/profile_view.modal.html',
      show: false,
      placement: 'center'
    });

    vm.activate();

    function activate() {
      // It's necessary to mark out there are two member objects
      // in this controller:
      // 1. vm.loginMember is the signed in user who is using the page.
      // 2. vm.member is the member object of  this member item.
      var member = Storage.getLoginMember();

      if (member === undefined) {
        // Invalid login user. Clear cache and redirect to login page.
        Storage.clearLoginMember();
        $location.path('/home');
        return;
      }

      // Clone the login member.
      vm.loginMember = angular.copy(member);

      // Avatar of vm.member.
      vm.avatarSrc = (!$.isEmptyObject(vm.member.avatar) ?
        vm.member.avatar :
        'images/profile-img.jpg');
    }

    function showProfile() {
      vm.memberProfileModal.show();
    }

    function changeRole(newRole) {
      switch (newRole) {
        case 'M':
        case 'P':
        case 'A':
          doChangeRole(newRole);
          break;

        default:
          Notification.notifyFailure();
          break;
      }
    }

    function removeMember() {
      if ($.isEmptyObject(vm.membership)) {
        return;
      }

      new Membership(vm.membership).$delete()
      .then(deleteSuccess)
      .catch(handler.generalHandler);
    }

    // Private functions.

    function doChangeRole(newRole) {
      if ($.isEmptyObject(vm.membership) || vm.membership.role == newRole) {
        return;
      }

      vm.membership.role = newRole;
      new Membership(vm.membership).$update()
      .then(Helpers.updateSuccess)
      .catch(handler.generalHandler);
    }

    function deleteSuccess() {
      $scope.$emit('member.delete');

      Helpers.deleteSuccess();
    }
  }
})();
