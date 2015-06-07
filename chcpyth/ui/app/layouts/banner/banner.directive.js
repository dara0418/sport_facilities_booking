(function() {
  'use strict';

  angular.module('app.layouts.banner')

  .directive('homeBanner', homeBanner);

  function homeBanner() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/layouts/banner/banner.html',
      controller: 'FooterController',
      controllerAs: 'vm',
      scope: {}
    };

    return directive;
  }
})();
