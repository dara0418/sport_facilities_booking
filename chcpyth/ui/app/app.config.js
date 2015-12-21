(function() {
  'use strict';

  angular.module('app.config', [])

  .config(globalConfigs)

  .constant('Config', configVariables());

  function globalConfigs($resourceProvider) {
    // By default, trailing slashes will be stripped from the calculated URLs, which can
    // pose problems with server backends that do not expect that behavior. This can be
    // disabled by the following line of code.
    $resourceProvider.defaults.stripTrailingSlashes = false;
  }

  function configVariables() {
    var hostProtocol = 'http';
    var hostIp = 'club-house.com';
    var hostPort = '80';
    var apiPrefix = '/api/v1/';

    // Search 7 days bookings.
    var bookingSearchDayAmount = 7;
    var lang = 'en';
    var currency = 'USD';

    return {
      hostProtocol: hostProtocol,
      hostIp: hostIp,
      hostPort: hostPort,
      apiPrefix: apiPrefix,
      baseUrl: hostProtocol + '://' + hostIp + ':' + hostPort,
      bookingSearchDayAmount: bookingSearchDayAmount,
      lang: lang,
      currency: currency
    }
  }
})();
