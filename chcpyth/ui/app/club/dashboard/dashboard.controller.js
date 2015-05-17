(function() {
  'use strict';

  angular.module('app.club.dashboard')

  .controller('ClubDashboardController', dashboardController);

  dashboardController.$inject = ['$scope', 'Notification', '$translate', 'Club',
    'Helpers', 'SharedProperties', 'Membership', '$location', 'ExceptionHandler'];

  function dashboardController($scope, Notification, $translate, Club,
    Helpers, SharedProperties, Membership, $location, ExceptionHandler) {
    var vm = this;

    var handler = ExceptionHandler;

    vm.activate = activate;

    vm.activate();

    // The startup function.
    function activate() {
      Helpers.safeGetLoginMember(vm);

      vm.club = SharedProperties.selectedClub;
    }
  }
})();
