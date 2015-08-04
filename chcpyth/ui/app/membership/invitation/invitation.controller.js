(function() {
  'use strict';

  angular.module('app.membership.invitation')

  .controller('MembershipInvitationController', controller);

  controller.$inject = ['$scope',  'Helpers', 'ExceptionHandler',
    'Storage', '$location', 'Member', 'Membership', '$timeout'];

  function controller($scope, Helpers, ExceptionHandler,
    Storage, $location, Member, Membership, $timeout) {
    var vm = this;

    var handler = ExceptionHandler;

    vm.activate = activate;
    vm.searchMember = searchMember;
    vm.club = Storage.getClub();

    // Save last change timestamp to avoid too frequently queries,
    // e.g. when a user is typing continuously.
    vm.lastChangeTS = Date.now();
    vm.queryProise = undefined;

    vm.activate();

    function activate() {
      if ($.isEmptyObject(vm.club)) {
        $location.path('/home');
        return;
      }
    }

    function searchMember() {
      // Clear the results.
      vm.members = [];

      // Don't search if keyword is shorter than or equals 2.
      if (vm.keyword.length <= 2) {
        return;
      }

      // If previous query promise is still pending, then cancel it.
      if (vm.queryProise !== undefined && vm.queryProise.$$state.status == 0) {
        $timeout.cancel(vm.queryProise);
      }

      // NOTE: Date.now() is not compitable with IE8 and below.
      var nowTS = Date.now();

      // A delayed query promise, allows 1.5s to wait for user input.
      var promise = $timeout(function() {
        searchByName(vm.keyword);

        // TODO - Limit email search(don't search suffix). Otherwise people can just
        //        input a 'com' to pull all members.
        //searchByEmail(vm.keyword);
      }, 1500);

      vm.queryProise = promise;
    }

    // Private functions.

    function searchByName(keyword) {
      Member.searchByName({ keyword: keyword }).$promise
      .then(function(members) {
        vm.members = vm.members.concat(members);
      })
      .catch(handler.generalHandler);
    }

    function searchByEmail(keyword) {
      Member.searchByEmail({ keyword: keyword }).$promise
      .then(function(members) {
        vm.members = vm.members.concat(members);
      })
      .catch(handler.generalHandler);
    }
  }
})();
