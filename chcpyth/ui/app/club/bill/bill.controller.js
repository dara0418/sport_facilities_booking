(function() {
  'use strict';

  angular.module('app.club.bill')

  .controller('ClubBillController', billController);

  billController.$inject = ['$scope', 'Helpers', 'Bill', 'Membership', '$resource',
    'MembershipRole', 'Config', 'ExceptionHandler'];

  function billController($scope, Helpers, Bill, Membership, $resource,
    MembershipRole, Config, ExceptionHandler) {
    var vm = this;

    var handler = ExceptionHandler;

    vm.bills = [];
    vm.activate = activate;

    vm.activate();

    // The startup function.
    function activate() {
      Helpers.safeGetLoginMember(vm);

      // Pull bills.
      Helpers.getClubsByMemberRef(vm.member.ref)
      .then(getBillsByClubs)
      .catch(handler.generalHandler);
    }

    // Private functions.

    function getBillsByClubs(clubs) {
      // Get bills by clubs' UUID.
      // TODO - Restrict the limitation in backend, only allow club admin see the bills.
      // TODO - Parallel the promises to speed up.
      $.each(clubs, function(index, club) {
        Bill.get({ club__ref: club.ref }).$promise
        .then(joinBills)
        .catch(handler.generalHandler);
      });
    }

    function joinBills(billResource) {
      // Join the bills together.
      vm.bills = vm.bills.concat(billResource.objects);
    }
  }
})();
