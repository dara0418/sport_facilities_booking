(function() {
  'use strict';

  angular.module('app.member.profile')

  .controller('MemberProfileController', profileController);

  profileController.$inject = ['$scope', 'Notification', '$translate', 'Member',
    'Storage', 'Helpers', 'Status', 'FileUploader', 'ExceptionHandler'];

  function profileController($scope, Notification, $translate, Member,
    Storage, Helpers, Status, FileUploader, ExceptionHandler) {
    var vm = this;

    vm.updateProfile = updateProfile;
    vm.activate = activate;
    vm.cancel = cancel;
    vm.uploadAvatar = uploadAvatar;
    vm.stu = Status;
    vm.uploader = new FileUploader({
      url: '/api/member/uploadAvatar/'
    });

    var handler = ExceptionHandler;

    vm.activate();

    function updateProfile() {
      var member = vm.member;

      if (member === undefined) {
        Notification.notifyFailure('INVALID_LOGIN');
        $location.path('/login');

        return;
      }

      Status.setStatusUpdating();

      // Wrap object with angular resource:
      // Because the vm.member object is parsed from sessionStorage,
      // it's a raw javascript object but not an angular resource.
      new Member(member).$update()
      .then(function(result) {
        // Sync with cache.
        Storage.setLoginMember(member);

        Status.resetStatus();
        Notification.notifySuccess('UPDATE_SUCCESS');
      })
      .catch(handler.general_handler);
    }

    function activate() {
      Status.resetStatus();
      Status.setPageMemberProfile();

      Helpers.safeGetLoginMember(vm);
    }

    function cancel() {
      // Reset the recent changes.
      // No tricks just get another clone of login member.
      Helpers.safeGetLoginMember(vm);
    }

    function uploadAvatar() {
      if (vm.uploader.queue.length == 0) {
        return;
      }

      vm.uploader.queue[vm.uploader.queue.length - 1].upload();
    }
  }
})();
