(function() {
  'use strict';

  angular.module('app.club.bill')

  .controller('ClubBillItemController', controller);

  controller.$inject = ['$scope', '$location', 'Helpers', 'ExceptionHandler', '$http'];

  function controller($scope, $location, Helpers, ExceptionHandler, $http) {
    var vm = this;

    vm.bill = $scope.bill;
    vm.activate = activate;
    vm.getBillingYear = Helpers.getBillingYear;
    vm.getBillingMonth = Helpers.getBillingMonth;
    vm.getBillingStatusStr = Helpers.getBillingStatusStr;
    vm.exportPDF = exportPDF;

    var handler = ExceptionHandler;

    vm.activate();

    function activate() {
      // Check if user already signed in.
      Helpers.safeGetLoginMember(vm);

      if ($.isEmptyObject(vm.member)) {
        $location.path('/home');
        return;
      }
    }

    function exportPDF() {
    }
  }
})();
