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
      url: '/api/member/avatar/',
      method: 'POST',
      onSuccessItem: onUploadSuccess,
      onErrorItem: onUploadFailed
      // formData will be append in vm.activate().
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
      .catch(handler.generalHandler);
    }

    function activate() {
      Status.resetStatus();

      Helpers.safeGetLoginMember(vm);

      if (vm.member === undefined) {
        $location.path('/landing');
      }

      var formData = [{ member_ref: vm.member.ref }];
      vm.uploader.formData = formData;

      vm.avatarSrc = (!$.isEmptyObject(vm.member.avatar) ?
        vm.member.avatar :
        'images/profile-img.jpg');

      // Convert landline and cellphone to int type, otherwise there will be an error
      // due to the type="number" in input tags. It won't hurt the backend.
      vm.member.landline = $.isEmptyObject(vm.member.landline) ? vm.member.landline : Number(vm.member.landline);
      vm.member.cellphone = $.isEmptyObject(vm.member.cellphone) ? vm.member.cellphone : Number(vm.member.cellphone);
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

    function onUploadSuccess() {
      Notification.notifySuccess('UPLOAD_SUCCESS');

      // Reload login user.
      Member.get({ ref: vm.member.ref }).$promise
      .then(updateLoginMember)
      .catch(handler.generalHandler);
    }

    function onUploadFailed() {
      Notification.notifyFailure('UPLOAD_FAILED');
    }

    function updateLoginMember(loginMember) {
      if (!$.isEmptyObject(loginMember)) {
        Storage.setLoginMember(loginMember);
        vm.member = angular.copy(loginMember);

        // Convert landline and cellphone to int type, otherwise there will be an error
        // due to the type="number" in input tags. It won't hurt the backend.
        vm.member.landline = $.isEmptyObject(vm.member.landline) ? vm.member.landline : Number(vm.member.landline);
        vm.member.cellphone = $.isEmptyObject(vm.member.cellphone) ? vm.member.cellphone : Number(vm.member.cellphone);
      }
    }
  }
})();
