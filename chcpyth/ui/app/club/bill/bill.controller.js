(function() {
  'use strict';

  angular.module('app.club.bill')

  .controller('ClubBillController', controller);

  controller.$inject = ['$scope', 'Helpers', 'Bill', 'ExceptionHandler',
    'Storage'];

  function controller($scope, Helpers, Bill, ExceptionHandler,
    Storage) {
    var vm = this;

    var handler = ExceptionHandler;

    vm.bills = [];
    vm.activate = activate;
    vm.club = Storage.getClub();

    vm.activate();

    // The startup function.
    function activate() {
      Helpers.safeGetLoginMember(vm);

      if ($.isEmptyObject(vm.member)) {
        $location.path('/home');
        return;
      }

      // Pull bills.
      if (!$.isEmptyObject(vm.club)) {
        Bill.get({ club__ref: vm.club.ref }).$promise
        .then(setBills)
        .catch(handler.generalHandler);
      }
    }

    // Private functions.
    function setBills(resource) {
      vm.bills = resource.objects;
    }
  }
})();
