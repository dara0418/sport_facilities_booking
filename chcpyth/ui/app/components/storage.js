(function() {
  'use strict';

  angular.module('app.components.storage', [])

  .factory('Storage', storageFactory);

  storageFactory.$inject = [];

  function storageFactory() {
    var service = {
      setLoginMember: setLoginMember,
      getLoginMember: getLoginMember,
      clearLoginMember: clearLoginMember
    };

    function setLoginMember(member) {
      if (!$.isEmptyObject(member)) {
        sessionStorage.loginMember = angular.toJson(member);
      }
    }

    function getLoginMember(member) {
      if (sessionStorage.loginMember === "undefined" || $.isEmptyObject(sessionStorage.loginMember)) {
        return undefined;
      }
      else {
        return angular.fromJson(sessionStorage.loginMember);
      }
    }

    function clearLoginMember(clearLoginMember) {
      sessionStorage.loginMember = undefined;
    }

    return service;
  }
})();
