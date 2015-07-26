(function() {
  'use strict';

  angular.module('app.club.photo')

  .controller('ClubPhotoController', controller);

  controller.$inject = ['$scope', '$translate', 'Club',
    'Helpers', 'Storage', 'ExceptionHandler', 'ClubPicture'];

  function controller($scope, $translate, Club,
    Helpers, Storage, ExceptionHandler, ClubPicture) {
    var vm = this;

    var handler = ExceptionHandler;

    vm.club = Storage.getClub();
    vm.activate = activate;

    vm.activate();

    function activate() {
      Helpers.safeGetLoginMember(vm);

      ClubPicture.get({ club__ref: vm.club.ref }).$promise
        .then(setClubPhotos)
        .catch(handler.generalHandler);
    }

    // Private functions.

    function setClubPhotos(resource) {
      vm.photos = resource.objects;
    }
  }
})();
