(function() {
  'use strict';

  angular.module('app.layouts.header')

  .directive('pageHeader', headerDirective);

  function headerDirective() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/layouts/header/header.html',
      controller: 'HeaderController',
      controllerAs: 'vm',
      scope: {}
    };

    return directive;
  }
})();
