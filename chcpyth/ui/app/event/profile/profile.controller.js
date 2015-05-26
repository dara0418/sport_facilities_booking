(function() {
  'use strict';

  angular.module('app.event.profile')

  .controller('EventProfileController', controller);

  controller.$inject = ['$scope', '$translate', 'Helpers',
    'Storage', '$location', 'ExceptionHandler', 'Event'];

  function controller($scope, $translate, Helpers,
    Storage, $location, ExceptionHandler, Event) {
    var vm = this;

    var handler = ExceptionHandler;

    vm.activate = activate;
    vm.update = update;
    vm.create = create;
    vm.remove = remove;
    vm.unselectEvent = unselectEvent;
    vm.s = Storage;
    vm.isEdit = $scope.isEdit;

    vm.activate();

    // The startup function.
    function activate() {
      Helpers.safeGetLoginMember(vm);
    }

    function update() {
      var event = Storage.getEvent();

      if ($.isEmptyObject(event.ref)) {
        // No ref, quit.
        return;
      }

      new Event(event).$update()
      .then(Helpers.updateSuccess)
      .catch(handler.generalHandler);
    }

    function create() {
      var event = {
        club__ref: Storage.getClub()
      };

      new Event(event).$save()
      .then(Helpers.saveSuccess)
      .catch(handler.generalHandler);
    }

    function remove() {
      var event = Storage.getEvent();

      if ($.isEmptyObject(event.ref)) {
        // No ref, quit.
        return;
      }

      new Event(event).$delete()
      .then(Helpers.deleteSuccess)
      .catch(handler.generalHandler);
    }

    function unselectEvent() {
      Storage.clearEvent();
    }
  }
})();
