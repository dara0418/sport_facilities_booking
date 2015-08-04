(function() {
  'use strict';

  angular.module('app.club.member')

  .controller('ClubMemberController', controller);

  controller.$inject = ['$scope', '$location', 'Membership',
    'ExceptionHandler', 'Helpers', 'Storage', '$modal'];

  function controller($scope, $location, Membership,
    ExceptionHandler, Helpers, Storage, $modal) {
    var vm = this;

    var handler = ExceptionHandler;

    vm.club = Storage.getClub();
    vm.memberships = [];
    vm.activate = activate;
    vm.newMember = newMember;

    vm.memberInvitationModal = $modal ({
      scope: $scope,
      template: 'app/membership/invitation/invitation.modal.html',
      show: false,
      placement: 'center'
    });

    $scope.$on('member.delete',function(){
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

    function newMember() {
      vm.memberInvitationModal.show();
    }

    // Private functions.

    function setMemberships(resource) {
      vm.memberships = resource.objects;
    }

    function loadMemberships() {
      if (vm.club !== undefined) {
        Membership.get({ club__ref: vm.club.ref }).$promise
        .then(setMemberships)
        .catch(handler.generalHandler);
      }
    }
  }
})();
