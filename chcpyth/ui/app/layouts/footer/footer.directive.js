(function() {
  'use strict';

  angular.module('app.layouts.footer')

  .directive('pageFooter', footerDirective);

  function footerDirective() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/layouts/footer/footer.html',
      controller: 'FooterController',
      controllerAs: 'vm',
      scope: {}
    };

    return directive;
  }
})();
