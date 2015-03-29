(function() {
  'use strict';

  angular.module('app.club_rate.profile')

  .controller('ClubRateProfileController', profileController);

  profileController.$inject = ['$scope', 'Notification', '$translate', 'Club',
    'Helpers', 'SharedProperties', 'Membership', '$location', 'ExceptionHandler',
    'ClubRate', 'MembershipRole'];

  function profileController($scope, Notification, $translate, Club,
    Helpers, SharedProperties, Membership, $location, ExceptionHandler,
    ClubRate, MembershipRole) {
    var vm = this;

    var handler = ExceptionHandler;

    vm.mRole = MembershipRole;
    vm.activate = activate;
    vm.update = update;
    vm.create = create;
    vm.remove = remove;

    vm.activate();

    // The startup function.
    function activate() {
      Helpers.safeGetLoginMember(vm);

      if (!$.isEmptyObject(SharedProperties.selectedClubRate)) {
        vm.rate = angular.copy(SharedProperties.selectedClubRate);

        // Clear selectedClubRate.
        SharedProperties.selectedClubRate = undefined;
      }
      else {
        vm.rate = { club: SharedProperties.selectedClub };
      }
    }

    function update() {
      if ($.isEmptyObject(vm.rate.ref)) {
        // No ref, quit.
        return;
      }

      new ClubRate(vm.rate).$update()
      .then(Helpers.updateSuccess)
      .catch(handler.generalHandler);
    }

    function create() {
      if (!$.isEmptyObject(vm.rate.ref)) {
        // The rate has a ref, it may be an existing rate.
        return;
      }

      new ClubRate(vm.rate).$save()
      .then(Helpers.saveSuccess)
      .catch(handler.generalHandler);
    }

    function remove() {
      if ($.isEmptyObject(vm.rate.ref)) {
        // No ref, quit.
        return;
      }

      new ClubRate(vm.rate).$delete()
      .then(Helpers.deleteSuccess)
      .catch(handler.generalHandler);
    }
  }
})();
