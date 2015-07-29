(function() {
  'use strict';

  angular.module('app.picture.club_picture_uploader')

  .controller('ClubPictureUploaderController', controller);

  controller.$inject = ['$scope', '$location', 'Notification',
    'Storage', 'Helpers', 'ExceptionHandler', 'FileUploader',
    'ClubPicture'];

  function controller($scope, $location, Notification,
    Storage, Helpers, ExceptionHandler, FileUploader,
    ClubPicture) {
    var vm = this;

    vm.club = $scope.club;
    vm.activate = activate;
    vm.uploadAll = uploadAll;

    var handler = ExceptionHandler;

    vm.uploader = new FileUploader({
      url: '/api/picture/club/',
      method: 'POST',
      onSuccessItem: onUploadSuccess,
      onErrorItem: onUploadFailed
      // formData will be append in vm.activate().
    });

    vm.activate();

    function activate() {
      // Check if user already signed in.
      Helpers.safeGetLoginMember(vm);

      if ($.isEmptyObject(vm.member)) {
        $location.path('/home');
        return;
      }

      var formData = [{ club_ref: vm.club.ref }];
      vm.uploader.formData = formData;
    }

    function uploadAll() {
      var result = vm.uploader.uploadAll();
    }

    // Private functions.
    function onUploadSuccess() {
      Notification.notifySuccess('UPLOAD_SUCCESS');
    }

    function onUploadFailed(item) {
      Notification.notifyFailure('UPLOAD_FAILED');

      // Reset the uploader status as it won't reset automatically.
      item.isUploaded = false;
      item.progress = 0;

      if (item.uploader.queue.length > 0) {
        item.uploader.progress -= 100 / item.uploader.queue.length;
      }
    }
  }
})();
