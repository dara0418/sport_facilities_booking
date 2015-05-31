(function() {
  'use strict';

  angular.module('app.components.status', [])

  .factory('Status', factory);

  factory.$inject = ['Storage', 'ServerStatus', 'Pages'];

  function factory(Storage, ServerStatus, Pages) {
    var service = {
      isIdle: isIdle,
      isGetting: isGetting,
      isUpdatting: isUpdatting,
      isAdding: isAdding,
      isRemoving: isRemoving,
      isLogin: isLogin,
      isRegister: isRegister,

      resetStatus: resetStatus,
      setStatusIdle: setStatusIdle,
      setStatusGetting: setStatusGetting,
      setStatusUpdating: setStatusUpdating,
      setStatusAdding: setStatusAdding,
      setStatusRemoving: setStatusRemoving,
      setStatusLogin: setStatusLogin,
      setStatusRegister: setStatusRegister,

      isInMemberProfile: isInMemberProfile,

      resetPage: resetPage,
      setPageMemberProfile: setPageMemberProfile
    };

    function isIdle() {
      return (Storage.getServerStatus() === ServerStatus.IDLE ||
        Storage.getServerStatus === undefined);
    }

    function isGetting() {
      return Storage.getServerStatus() === ServerStatus.GETTING;
    }

    function isUpdatting() {
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

    function resetPage() {
      Storage.setCurrentPage(Pages.NONE);
    }

    function isInMemberProfile() {
      return Storage.getCurrentPage() === Pages.MEMBER_PROFILE;
    }

    function setPageMemberProfile() {
      Storage.setCurrentPage(Pages.MEMBER_PROFILE);
    }

    return service;
  }
})();
