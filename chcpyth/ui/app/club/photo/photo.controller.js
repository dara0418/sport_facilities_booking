(function() {
  'use strict';

  angular.module('app.club.photo')

  .controller('ClubPhotoController', controller);

  controller.$inject = ['$scope', '$translate', 'Club',
    'Helpers', 'Storage', 'ExceptionHandler', 'ClubPicture',
    'Notification', '$modal'];

  function controller($scope, $translate, Club,
    Helpers, Storage, ExceptionHandler, ClubPicture,
    Notification, $modal) {
    var vm = this;

    var handler = ExceptionHandler;

    vm.club = Storage.getClub();
    vm.activate = activate;
    vm.showUploadMgr = showUploadMgr;
    vm.removePhoto = removePhoto;

    vm.clubPhotoModal = $modal ({
      scope: $scope,
      template: 'app/picture/club_picture_uploader/club_picture_uploader.modal.html',
      show: false,
      placement: 'center'
    });

    // Reload photos after upload modal closed.
    $scope.$on('modal.hide',function(){
      loadPhotos();
    });

    vm.activate();

    function activate() {
      Helpers.safeGetLoginMember(vm);

      if (vm.member === undefined) {
        $location.path('/home');
        return;
      }

      loadPhotos();
    }

    function showUploadMgr() {
      vm.clubPhotoModal.show();
    }

    function removePhoto(photo) {
      new ClubPicture(photo).$delete()
      .then(loadPhotos)
      .catch(handler.generalHandler);
    }

    // Private functions.

    function setClubPhotos(resource) {
      vm.photos = resource.objects;
    }

    function loadPhotos() {
      ClubPicture.get({ club__ref: vm.club.ref }).$promise
        .then(setClubPhotos)
        .catch(handler.generalHandler);
    }
  }
})();
