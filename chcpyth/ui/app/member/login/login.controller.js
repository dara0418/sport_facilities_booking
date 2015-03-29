(function() {
  'use strict';

  angular.module('app.member.login')

  .controller('MemberLoginController', loginController);

  loginController.$inject = ['$scope', '$location', 'Notification', '$translate', 'Member',
    'Storage'];

  function loginController($scope, $location, Notification, $translate, Member,
    Storage) {
    var vm = this;

    vm.login = login;

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

        $location.path('/member/profile');
      })
      .catch(function(error) {
      });
    }
  }
})();
