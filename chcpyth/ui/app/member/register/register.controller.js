(function() {
  'use strict';

  angular.module('app.member.register')

  .controller('MemberRegisterController', registerController);

  registerController.$inject = ['$scope', '$location', 'Notification', '$translate',
    'Member', 'ExceptionHandler', 'Status'];

  function registerController($scope, $location, Notification, $translate,
    Member, ExceptionHandler, Status) {
    var vm = this;

    vm.activate = activate;
    vm.register = register;
    vm.stu = Status;

    var handler = ExceptionHandler;

    vm.activate();

    function activate() {
      Status.setStatusIdle();
    }

    function register() {
      if ($.isEmptyObject(vm.email) || $.isEmptyObject(vm.password) ||
        vm.password.trim() !== vm.reEnter.trim()) {
        return;
      }

      Status.setStatusRegister();

      var member = new Member({
        email: vm.email,
        password: vm.password
      });

      member.$register()
      .then(function(result) {
        Notification.notifySuccess('REGISTER_SUCCESS');
        Status.setStatusIdle();
      })
      .catch(handler.generalHandler);
    }
  }
})();
