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
    vm.memberships = [];
    $scope.onQuitClub = onQuitClub;

    $scope.$on('membership.created', function() {
      loadMemberships();
    });

    vm.activate();

    function activate() {
      Helpers.safeGetLoginMember(vm);

      if ($.isEmptyObject(vm.member)) {
        $location.path('/home');
        return;
      }

      loadMemberships();
    }

    // Private functions.

    function loadMemberships() {
      vm.memberships = [];

      // Pull memberships of the current login user.
      Helpers.getMembershipsByMemberRef(vm.member.ref)
      .then(setMemberships)
      .catch(handler.generalHandler);
    }

    function setMemberships(resource) {
      vm.memberships = resource.objects;
    }

    function onQuitClub(removedMembership) {
      loadMemberships();
    }
  }
})();
