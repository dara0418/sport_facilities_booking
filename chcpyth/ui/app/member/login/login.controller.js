(function() {
  'use strict';

  angular.module('app.member.login')

  .controller('MemberLoginController', loginController);

  loginController.$inject = ['$scope', '$location', 'Notification', '$translate', 'Member',
    'Storage', 'Helpers', 'ExceptionHandler'];

  function loginController($scope, $location, Notification, $translate, Member,
    Storage, Helpers, ExceptionHandler) {
    var vm = this;

    vm.login = login;
    vm.logout = logout;
    vm.goToMyAccount = goToMyAccount;
    vm.activate = activate;

    vm.activate();

    var handler = ExceptionHandler;

    function activate() {
      // Check if user already signed in.
      Helpers.safeGetLoginMember(vm);

      if (!$.isEmptyObject(vm.member)) {
        vm.hasLogin = true;
      }
    }

    function login() {
      if ($.isEmptyObject(vm.email) || $.isEmptyObject(vm.password)) {
        Notification.notifyFailure('EMPTY_FIELD');
        return;
      }

      var member = new Member({
        username: vm.email,
        password: vm.password
      });

      member.$login()
      .then(function(result) {
        if (result !== undefined) {
          // Cache member.
          Storage.setLoginMember(result);
        }

        $location.path('/member/dashboard');
      })
      .catch(handler.generalHandler);
    }

    function logout() {
      member.$login()
      .then(function(result) {
        Storage.clearLoginMember();

        $location.path('/landing');
      })
      .catch(handler.generalHandler);
    }

    function goToMyAccount() {
      $location.path('/member/dashboard');
    }
  }
})();
