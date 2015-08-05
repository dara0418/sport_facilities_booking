(function() {
  'use strict';

  angular.module('app.member.dashboard')

  .controller('MemberDashboardController', memberDashboardController);

  memberDashboardController.$inject = ['$scope', 'SharedProperties', 'Storage',
    'Helpers', '$location'];

  function memberDashboardController($scope, SharedProperties, Storage,
    Helpers, $location) {
    var vm = this;

    vm.sharedProperties = SharedProperties;
    vm.s = Storage;
    vm.newNotifications = 0;

    vm.activate = activate;

    $scope.$on('notification.new', function(event, newCnt) {
      vm.newNotifications = newCnt;
    });

    vm.activate();

    function activate() {
      Storage.clearData();

      Helpers.safeGetLoginMember(vm);

      if ($.isEmptyObject(vm.member)) {
        $location.path('/landing');
      }
    }
  }
})();
