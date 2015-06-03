(function() {
  'use strict';

  angular.module('app.components.status', [])

  .factory('Status', factory);

  factory.$inject = ['Storage', 'ServerStatus', 'Pages'];

  function factory(Storage, ServerStatus, Pages) {
    var service = {
      isIdle: isIdle,
      isGetting: isGetting,
      isUpdating: isUpdating,
      isAdding: isAdding,
      isRemoving: isRemoving,
      isLogin: isLogin,
      isRegister: isRegister,
      isChangingPassword: isChangingPassword,

      resetStatus: resetStatus,
      setStatusIdle: setStatusIdle,
      setStatusGetting: setStatusGetting,
      setStatusUpdating: setStatusUpdating,
      setStatusAdding: setStatusAdding,
      setStatusRemoving: setStatusRemoving,
      setStatusLogin: setStatusLogin,
      setStatusRegister: setStatusRegister,
      setStatusChangePassword: setStatusChangePassword
    };

    function isIdle() {
      return (Storage.getServerStatus() === ServerStatus.IDLE ||
        Storage.getServerStatus === undefined);
    }

    function isGetting() {
      return Storage.getServerStatus() === ServerStatus.GETTING;
    }

    function isUpdating() {
      return Storage.getServerStatus() === ServerStatus.UPDATING;
    }

    function isAdding() {
      return Storage.getServerStatus() === ServerStatus.ADDING;
    }

    function isRemoving() {
      return Storage.getServerStatus() === ServerStatus.REMOVING;
    }

    function isLogin() {
      return Storage.getServerStatus() === ServerStatus.LOGIN;
    }

    function isRegister() {
      return Storage.getServerStatus() === ServerStatus.REGISTER;
    }

    function isChangingPassword() {
      return Storage.getServerStatus() === ServerStatus.CHANGE_PASSWORD;
    }

    function resetStatus() {
      Storage.clearServerStatus();
    }

    function setStatusIdle() {
      Storage.setServerStatus(ServerStatus.IDLE);
    }

    function setStatusGetting() {
      Storage.setServerStatus(ServerStatus.GETTING);
    }

    function setStatusUpdating() {
      Storage.setServerStatus(ServerStatus.UPDATING);
    }

    function setStatusAdding() {
      Storage.setServerStatus(ServerStatus.ADDING);
    }

    function setStatusRemoving() {
      Storage.setServerStatus(ServerStatus.REMOVING);
    }

    function setStatusLogin() {
      Storage.setServerStatus(ServerStatus.LOGIN);
    }

    function setStatusRegister() {
      Storage.setServerStatus(ServerStatus.REGISTER);
    }

    function setStatusChangePassword() {
      Storage.setServerStatus(ServerStatus.CHANGE_PASSWORD);
    }

    return service;
  }
})();
