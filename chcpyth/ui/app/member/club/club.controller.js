(function() {
  'use strict';

  angular.module('app.member.club')

  .controller('MemberClubController', memberClubController);

  memberClubController.$inject = ['$scope', 'ExceptionHandler', 'MembershipRole',
    'Helpers', '$location', 'Storage'];

  function memberClubController($scope, ExceptionHandler, MembershipRole,
    Helpers, $location, Storage) {
    var vm = this;
    var handler = ExceptionHandler;

    vm.activate = activate;
    vm.clubs = [];
    $scope.onQuitClub = onQuitClub;

    vm.activate();

    function activate() {
      Helpers.safeGetLoginMember(vm);

      // Pull clubs of the current login user.
      Helpers.getClubsByMemberRef(vm.member.ref)
      .then(setClubs)
      .catch(handler.generalHandler);
    }

    // Private functions.

    function setClubs(clubs) {
      vm.clubs = clubs;
    }

    function onQuitClub(removedMembership) {
      // Remove the deleted club from vm.clubs array.
      vm.clubs = $.grep(vm.clubs, function(club, index) {
        return club.ref != removedMembership.club.ref;
      });
    }
  }
})();
