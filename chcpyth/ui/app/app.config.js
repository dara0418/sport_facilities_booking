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
    var hostIp = '127.0.0.1';
    var hostPort = '8011';
    var apiPrefix = '/api/v1/';

    return {
      hostProtocol: hostProtocol,
      hostIp: hostIp,
      hostPort: hostPort,
      apiPrefix: apiPrefix,
      baseUrl: hostProtocol + '://' + hostIp + ':' + hostPort
    }
  }
})();
