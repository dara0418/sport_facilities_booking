(function() {
  'use strict';

  angular.module('app.member.booking')

  .directive('memberBooking', memberBooking);

  function memberBooking() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/member/booking/booking.html',
      controller: 'MemberBookingController',
      controllerAs: 'vm',
      scope: {}
    };

    return directive;
  }
})();
