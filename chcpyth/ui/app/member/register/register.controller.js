(function() {
  'use strict';

  angular.module('app.member.register')

  .controller('MemberRegisterController', registerController);

  registerController.$inject = ['$scope', '$location', 'Notification', '$translate',
    'Member'];

  function registerController($scope, $location, Notification, $translate,
    Member) {
    var vm = this;

    vm.register = register;

    function register() {
      if ($.isEmptyObject(vm.email) || $.isEmptyObject(vm.password) ||
        $.isEmptyObject(vm.reEnter)) {
        Notification.notifyFailure('EMPTY_FIELD');
        return;
      }

      var member = new Member({
        email: vm.email,
        password: vm.password
      });

      member.$register()
      .then(function(result) {
        Notification.notifySuccess('REGISTER_SUCCESS');

        $location.path('/member/login');
      })
      .catch(function(error) {
        // Go to global handler.
      });
    }
  }
})();
