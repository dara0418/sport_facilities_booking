(function() {
  'use strict';

  angular.module('app.layouts.header')

  .controller('HeaderController', headerController);

  headerController.$inject = ['$scope'];

  function headerController($scope) {
    var vm = this;
  }
})();
