(function() {
  'use strict';

  angular.module('app.club.event')

  .controller('ClubEventItemController', controller);

  controller.$inject = ['$scope', '$location', '$translate',
    'Helpers', 'ExceptionHandler', 'Storage'];

  function controller($scope, $location, $translate,
    Helpers, ExceptionHandler, Storage) {
    var vm = this;

    vm.event = $scope.event;
    vm.activate = activate;
    vm.selectEvent = selectEvent;

    var handler = ExceptionHandler;

    vm.activate();

    function activate() {
      // Check if user already signed in.
      Helpers.safeGetLoginMember(vm);

      if ($.isEmptyObject(vm.member)) {
        $location.path('/member/login');
      }
    }

    function selectEvent() {
      Storage.setEvent(vm.event);
    }
  }
})();
