(function() {
  'use strict';

  angular.module('app.layouts.footer')

  .controller('FooterController', footerController);

  footerController.$inject = ['$scope'];

  function footerController($scope) {
    var vm = this;
  }
})();
