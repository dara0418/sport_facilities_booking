(function() {
  'use strict';

  angular.module('app.components.i18n', [])

  .config(prefer);

  function prefer($translateProvider) {
    $translateProvider.preferredLanguage('en');
  }
})();
