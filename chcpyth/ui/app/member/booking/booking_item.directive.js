(function() {
  'use strict';

  angular.module('app.member.booking')

  .directive('memberBookingItem', memberBookingItem);

  function memberBookingItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/member/booking/booking_item.html',
      controller: 'MemberBookingItemController',
      controllerAs: 'vm',
      scope: {
        booking: '=',
        hasCompleted: '@'
      }
    };

    return directive;
  }
})();
