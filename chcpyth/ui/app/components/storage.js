(function() {
  'use strict';

  angular.module('app.components.storage', [])

  .factory('Storage', storageFactory);

  storageFactory.$inject = [];

  function storageFactory() {
    var service = {
      clearData: clearData,

      setLoginMember: setLoginMember,
      getLoginMember: getLoginMember,
      clearLoginMember: clearLoginMember,

      setClub: setClub,
      getClub: getClub,
      clearClub: clearClub,

      setBooking: setBooking,
      getBooking: getBooking,
      clearBooking: clearBooking
    };

    function clearData() {
      clearClub();
      clearBooking();
    }

    function setLoginMember(member) {
      if (!$.isEmptyObject(member)) {
        sessionStorage.loginMember = angular.toJson(member);
      }
    }

    function getLoginMember() {
      if (sessionStorage.loginMember === "undefined" || $.isEmptyObject(sessionStorage.loginMember)) {
        return undefined;
      }
      else {
        return angular.fromJson(sessionStorage.loginMember);
      }
    }

    function clearLoginMember() {
      sessionStorage.loginMember = undefined;
    }

    function setClub(club) {
      if (!$.isEmptyObject(club)) {
        sessionStorage.selectedClub = angular.toJson(club);
      }
    }

    function getClub() {
      if (sessionStorage.selectedClub === "undefined" || $.isEmptyObject(sessionStorage.selectedClub)) {
        return undefined;
      }
      else {
        return angular.fromJson(sessionStorage.selectedClub);
      }
    }

    function clearClub() {
      sessionStorage.selectedClub = undefined;
    }

    function setBooking(booking) {
      if (!$.isEmptyObject(booking)) {
        sessionStorage.selectedBooking = angular.toJson(booking);
      }
    }

    function getBooking() {
      if (sessionStorage.selectedBooking === "undefined" || $.isEmptyObject(sessionStorage.selectedBooking)) {
        return undefined;
      }
      else {
        return angular.fromJson(sessionStorage.selectedBooking);
      }
    }

    function clearBooking() {
      sessionStorage.selectedBooking = undefined;
    }

    return service;
  }
})();
