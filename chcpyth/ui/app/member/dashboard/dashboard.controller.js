(function() {
  'use strict';

  angular.module('app.member.dashboard')

  .controller('MemberDashboardController', memberDashboardController);

  memberDashboardController.$inject = ['$scope', 'SharedProperties', 'Storage'];

  function memberDashboardController($scope, SharedProperties, Storage) {
    var vm = this;

    vm.sharedProperties = SharedProperties;

    vm.activate = activate;

    function activate() {
      Storage.clearData();
    }
  }
})();
