(function() {
  'use strict';

  angular.module('app.member.login')

  .controller('LoginPluginController', controller);

  controller.$inject = ['$scope', '$location', '$translate', 'Member',
    'Storage', 'Helpers', 'ExceptionHandler'];

  function controller($scope, $location, $translate, Member,
    Storage, Helpers, ExceptionHandler) {
    var vm = this;

    vm.signOut = signOut;
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

    function signOut() {
      new Member(vm.member).$logout()
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
