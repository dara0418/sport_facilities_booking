(function() {
  'use strict';

  angular.module('app.club.facility')

  .controller('ClubFacilityItemController', controller);

  controller.$inject = ['$scope', '$location', 'Helpers', 'ExceptionHandler',
    'Storage'];

  function controller($scope, $location, Helpers, ExceptionHandler,
    Storage) {
    var vm = this;

    vm.activate = activate;
    vm.facility = $scope.facility;

    vm.getTimeUnitStr = Helpers.getTimeUnitStr;
    vm.getSportTypeStr = Helpers.getSportTypeStr;

    var handler = ExceptionHandler;

    vm.activate();

    function activate() {
      Helpers.safeGetLoginMember(vm);

      if (vm.member === undefined) {
        // Invalid login user. Clear cache and redirect to login page.
        Storage.clearLoginMember();
        $location.path('/home');
        return;
      }
    }
  }
})();
