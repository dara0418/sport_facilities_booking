(function() {
  'use strict';

  angular.module('app.components.notification', [])

  .factory('Notification', notificationFactory);

  notificationFactory.$inject = ['$translate'];

  function notificationFactory($translate) {
    var service = {
      notifySuccess: notifySuccess,
      notifyFailure: notifyFailure,
      notifyInfo: notifyInfo
    };

    function notifySuccess(msg, prefix, suffix) {
      toastr.options.positionClass = 'toast-top-right';
      toastr.options.closeButton = true;
      toastr.options.showEasing = 'swing';
      toastr.options.hideEasing = 'linear';
      $translate([msg, 'SUCCESS']).then(function(translations) {
        var message = ($.isEmptyObject(prefix) ? '' : prefix + ' ') +
          translations[msg] +
          ($.isEmptyObject(suffix) ? '' : ' ' + suffix);

        toastr.success(message, translations.SUCCESS);
      });
    }

    function notifyFailure(msg, prefix, suffix) {
      toastr.options.positionClass = 'toast-top-right';
      toastr.options.closeButton = true;
      toastr.options.showEasing = 'swing';
      toastr.options.hideEasing = 'linear';
      $translate([msg, 'ERROR']).then(function(translations) {
        var message = ($.isEmptyObject(prefix) ? '' : prefix + ' ') +
          translations[msg] +
          ($.isEmptyObject(suffix) ? '' : ' ' + suffix);

        toastr.error(message, translations.ERROR);
      });
    }

    function notifyInfo(msg, prefix, suffix) {
      toastr.options.positionClass = 'toast-top-right';
      toastr.options.closeButton = true;
      toastr.options.showEasing = 'swing';
      toastr.options.hideEasing = 'linear';
      $translate([msg, 'INFO']).then(function(translations) {
        var message = ($.isEmptyObject(prefix) ? '' : prefix + ' ') +
          translations[msg] +
          ($.isEmptyObject(suffix) ? '' : ' ' + suffix);

        toastr.info(message, translations.INFO);
      });
    }

    return service;
  }
})();
