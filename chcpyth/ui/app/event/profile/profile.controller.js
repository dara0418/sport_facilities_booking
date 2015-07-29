(function() {
  'use strict';

  angular.module('app.event.profile')

  .controller('EventProfileController', controller);

  controller.$inject = ['$scope', 'Helpers', 'Storage', '$location',
    'ExceptionHandler', 'Event'];

  function controller($scope, Helpers, Storage, $location,
    ExceptionHandler, Event) {
    var vm = this;

    var handler = ExceptionHandler;

    vm.event = $scope.event;
    vm.club = Storage.getClub();
    vm.activate = activate;
    vm.update = update;
    vm.create = create;
    vm.isEdit = true;

    vm.activate();

    // The startup function.
    function activate() {
      Helpers.safeGetLoginMember(vm);

      if ($.isEmptyObject(vm.member)) {
        $location.path('/home');
        return;
      }

      if (vm.event === undefined && vm.club !== undefined) {
        vm.event = {
          club: angular.copy(vm.club)
        };

        vm.isEdit = false;
      }
    }

    function update() {
      if ($.isEmptyObject(vm.event.ref)) {
        // No ref, quit.
        return;
      }

      new Event(vm.event).$update()
      .then(onUpdateSuccess)
      .catch(handler.generalHandler);
    }

    function create() {
      new Event(vm.event).$save()
      .then(onCreateSuccess)
      .catch(handler.generalHandler);
    }

    // Private function.

    function onCreateSuccess() {
      $scope.$parent.$parent.onCreateSuccess();

      Helpers.saveSuccess();
    }

    function onUpdateSuccess() {
      $scope.$parent.$parent.onUpdateSuccess();

      Helpers.updateSuccess();
    }
  }
})();
