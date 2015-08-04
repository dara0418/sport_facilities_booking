(function() {
  'use strict';

  angular.module('app.member.profile')

  .controller('MemberProfileViewController', controller);

  controller.$inject = ['$scope'];

  function controller($scope) {
    var vm = this;

    vm.activate = activate;
    vm.member = $scope.member;

    vm.activate();

    function activate() {
      vm.avatarSrc = (!$.isEmptyObject(vm.member.avatar) ?
        vm.member.avatar :
        'images/profile-img.jpg');
    }
  }
})();
