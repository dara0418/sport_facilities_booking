(function() {
  'use strict';

  angular.module('app.picture.club_picture_uploader')

  .directive('clubPictureUploader', clubPictureUploader);

  function clubPictureUploader() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/picture/club_picture_uploader/club_picture_uploader.html',
      controller: 'ClubPictureUploaderController',
      controllerAs: 'vm',
      scope: {
        club: '='
      }
    };

    return directive;
  }
})();
