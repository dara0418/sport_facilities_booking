(function() {
  'use strict';

  angular.module('app.club.member')

  .controller('ClubMemberItemController', controller);

  controller.$inject = ['$scope', '$location', 'Helpers',
    'ExceptionHandler', 'Membership', 'Notification', 'Storage'];

  function controller($scope, $location, Helpers,
    ExceptionHandler, Membership, Notification, Storage) {
    var vm = this;

    vm.activate = activate;
    vm.member = $scope.member;

    var handler = ExceptionHandler;

    vm.activate();

    function activate() {
      // It's necessary to mark out there are two member objects
      // in this controller:
      // 1. vm.loginMember is the signed in user who is using the page.
      // 2. vm.member is the member object of  this member item.
      var member = Storage.getLoginMember();

      if (member === undefined) {
        // Invalid login user. Clear cache and redirect to login page.
        Storage.clearLoginMember();
        $location.path('/home');
      }

      // Clone the login member.
      vm.loginMember = angular.copy(member);

      // Avatar of vm.member.
      vm.avatarSrc = (!$.isEmptyObject(vm.member.avatar) ?
        vm.member.avatar :
        'images/profile-img.jpg');
    }
  }
})();
