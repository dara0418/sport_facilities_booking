(function() {
  'use strict';

  angular.module('app.club.bill')

  .directive('clubBill', clubBill);

  function clubBill() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/club/bill/bill.html',
      controller: 'ClubBillController',
      controllerAs: 'vm',
      scope: {}
    };

    return directive;
  }
})();
