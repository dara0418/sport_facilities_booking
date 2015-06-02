(function() {
  'use strict';

  angular.module('app.member.password', [])

  .controller('MemberPasswordController', passwordController);

  passwordController.$inject = ['$scope', '$translate', 'Member', 'Notification',
    'Storage', 'Helpers', 'ExceptionHandler', 'Status'];

  function passwordController($scope, $translate, Member, Notification,
    Storage, Helpers, ExceptionHandler, Status) {
    var vm = this;

    vm.changePassword = changePassword;
    vm.resetPassword = resetPassword;
    vm.activate = activate;
    vm.stu = Status;

    var handler = ExceptionHandler;

    vm.activate();

    function changePassword() {
      if ($.isEmptyObject(vm.oldPassword) || $.isEmptyObject(vm.newPassword) ||
        $.isEmptyObject(vm.reEnter)) {
        return;
      }

      if (vm.newPassword.trim() != vm.reEnter.trim()) {
        return;
      }

      Status.setStatusChangePassword();

      var member = new Member({
        username: vm.member.email,
        old_password: vm.oldPassword,
        new_password: vm.newPassword
      });

      member.$change_password()
      .then(function(result) {
        Notification.notifySuccess('PASSWORD_CHANGED');
        Status.resetStatus();
      })
      .catch(handler.general_handler);
    }

    function resetPassword() {
      // TODO - Requires SMTP server to send emails to reset password.
    }

    function activate() {
      Status.resetStatus();
      Helpers.safeGetLoginMember(vm);
    }
  }
})();
