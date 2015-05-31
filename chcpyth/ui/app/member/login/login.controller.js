(function() {
  'use strict';

  angular.module('app.member.login')

  .controller('MemberLoginController', controller);

  controller.$inject = ['$scope', '$location', '$translate', 'Member',
    'Storage', 'ExceptionHandler', 'Status'];

  function controller($scope, $location, $translate, Member,
    Storage, ExceptionHandler, Status) {
    var vm = this;

    vm.activate = activate;
    vm.login = login;
    vm.stu = Status;

    var handler = ExceptionHandler;

    vm.activate();

    function activate() {
      Status.setStatusIdle();
    }

    function login() {
      if ($.isEmptyObject(vm.email) || $.isEmptyObject(vm.password)) {
        return;
      }

      Status.setStatusLogin();

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

        Status.setStatusIdle();

        $location.path('/member/dashboard');
      })
      .catch(handler.generalHandler);
    }
  }
})();
