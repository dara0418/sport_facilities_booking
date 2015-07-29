(function() {
  'use strict';

  angular.module('app.club.bill')

  .directive('clubBillItem', clubBillItem);

  function clubBillItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/club/bill/bill_item.html',
      controller: 'ClubBillItemController',
      controllerAs: 'vm',
      scope: {
        bill: '='
      }
    };

    return directive;
  }
})();
