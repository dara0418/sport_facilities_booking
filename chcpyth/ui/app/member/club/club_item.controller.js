(function() {
  'use strict';

  angular.module('app.member.club')

  .controller('MemberClubItemController', controller);

  controller.$inject = ['$scope', '$location', '$translate',
    'Helpers', 'ExceptionHandler', 'ClubPicture', 'Membership',
    'Notification', 'Storage'];

  function controller($scope, $location, $translate,
    Helpers, ExceptionHandler, ClubPicture, Membership,
    Notification, Storage) {
    var vm = this;

    vm.club = $scope.membership.club;
    vm.role = $scope.membership.role;
    vm.activate = activate;
    vm.goToClubDashboard = goToClubDashboard;
    vm.visitClub = visitClub;
    vm.quitClub = quitClub;

    $scope.$on('membership.created', function() {
      loadClubPicture();
      loadClubAddress();
    });

    var handler = ExceptionHandler;

    vm.activate();

    function activate() {
      // Check if user already signed in.
      Helpers.safeGetLoginMember(vm);

      if ($.isEmptyObject(vm.member)) {
        $location.path('/home');
        return;
      }

      loadClubPicture();
      loadClubAddress();
    }

    function goToClubDashboard() {
      Storage.setClub(vm.club);
      $location.path('/club/dashboard');
    }

    function visitClub() {
      Notification.notifySuccess('Club home page is still underdevelopment.');
    }

    function quitClub() {
      var club = vm.club;

      if ($.isEmptyObject(club)) {
        // No club selected, quit.
        return;
      }

      // Delete the membership.
      Membership.get({
        club__ref: club.ref,
        member__ref: vm.member.ref
      }).$promise
      .then(removeMembership)
      .then(quiteClubSuccess)
      .catch(handler.generalHandler);
    }

    // Private functions.

    function loadClubPicture() {
      // Pull club pictures.
      ClubPicture.get({ club__ref: vm.club.ref }).$promise
      .then(setClubPicture)
      .catch(handler.generalHandler);
    }

    function loadClubAddress() {
      var address = vm.club.address;
      vm.addressStr = address.line1 + ' ' + address.line2 + ', ' +
        address.city + ', ' + address.province;
      vm.country = address.country;
    }

    function setClubPicture(resource) {
      if ($.isEmptyObject(resource.objects) || resource.objects.length == 0) {
        vm.clubImg = 'images/profile-img.jpg';
      }
      else {
        vm.clubImg = resource.objects[0].url;
      }
    }

    function removeMembership(membershipResource) {
      var memberships = membershipResource.objects;

      if (memberships.length != 1) {
        // Found no membership or multiple memberships.
        // Couldn't determine how to remove the membership in this situation, quit...
        return;
      }

      return new Membership(memberships[0]).$delete();
    }

    function quiteClubSuccess(removedMembership) {
      Notification.notifySuccess('QUIT_CLUB_SUCCESS');

      // Call the onQuiteClub function in ClubController to remove the item from list.
      // Should access two $parent layers to find the correct parent scope,
      // because ng-repeat potentially creates a new scope.
      if ($.isFunction($scope.$parent.$parent.onQuitClub)) {
        $scope.$parent.$parent.onQuitClub(removedMembership);
      }
    }
  }
})();
