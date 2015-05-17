(function() {
  'use strict';

  angular.module('app.member.dashboard')

  .controller('MemberDashboardController', memberDashboardController);

  memberDashboardController.$inject = ['$scope', 'SharedProperties'];

  function memberDashboardController($scope, SharedProperties) {
    var vm = this;

    vm.sharedProperties = SharedProperties;
  }
})();
