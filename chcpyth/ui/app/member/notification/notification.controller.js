(function() {
  'use strict';

  angular.module('app.member.notification')

  .controller('MemberNotificationController', notificationController);

  notificationController.$inject = ['$scope', 'Helpers'];

  function notificationController($scope, Helpers) {
    var vm = this;

    vm.activate = activate;

    vm.activate();

    function activate() {
      // Check if user already signed in.
      Helpers.safeGetLoginMember(vm);
    }
  }
})();
