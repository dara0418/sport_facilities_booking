(function() {
  'use strict';

  angular.module('app.club.photo')

  .directive('clubPhoto', clubPhoto);

  function clubPhoto() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/club/photo/photo.html',
      controller: 'ClubPhotoController',
      controllerAs: 'vm',
      scope: {}
    };

    return directive;
  }
})();
