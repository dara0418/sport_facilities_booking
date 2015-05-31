(function() {
  'use strict';

  angular.module('app.components.exception_handler', [])

  .factory('ExceptionHandler', exceptionHandlerFactory);

  exceptionHandlerFactory.$inject = ['$q', 'Notification', 'Status'];

  function exceptionHandlerFactory($q, Notification, Status) {
    var service = {
      generalHandler: generalHandler
    };

    // Note: Do not chain more than one handler in your promise chains.
    // This handler may get executed multiple times in one chain if you do that.
    function generalHandler(error) {
      // TODO - Handle variety of errors properly.
      console.log(error);

      if ($.isEmptyObject(error.errorMsg)) {
        Notification.notifyFailure('INTERNAL_ERROR');
      }
      else {
        Notification.notifyFailure(error.errorMsg, error.prefix, error.suffix);
      }

      Status.resetStatus();

      return $q.reject('Internal error');
    }

    return service;
  }
})();
