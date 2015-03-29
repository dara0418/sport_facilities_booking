(function() {
  'use strict';

  angular.module('app.member.profile')

  .controller('MemberProfileController', profileController);

  profileController.$inject = ['$scope', 'Notification', '$translate', 'Member',
    'Storage', 'Helpers'];

  function profileController($scope, Notification, $translate, Member,
    Storage, Helpers) {
    var vm = this;

    vm.updateProfile = updateProfile;
    vm.activate = activate;

    vm.activate();

    function updateProfile() {
      var member = vm.member;

      if (member === undefined) {
        Notification.notifyFailure('INVALID_LOGIN');
        $location.path('/login');

        return;
      }

      // Wrap object with angular resource:
      // Because the vm.member object is parsed from sessionStorage,
      // it's a raw javascript object but not an angular resource.
      new Member(member).$update()
      .then(function(result) {
        // Sync with cache.
        Storage.setLoginMember(member);

        Notification.notifySuccess('UPDATE_SUCCESS');
      })
      .catch(function(error) {
        // Go to global handler.
      });
    }

    function activate() {
      Helpers.safeGetLoginMember(vm);
    }
  }
})();
