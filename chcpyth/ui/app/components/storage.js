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

      setCurrentPage: setCurrentPage,
      getCurrentPage: getCurrentPage,
      clearCurrentPage: clearCurrentPage,

      setServerStatus: setServerStatus,
      getServerStatus: getServerStatus,
      clearServerStatus: clearServerStatus,

      setClub: setClub,
      getClub: getClub,
      clearClub: clearClub,

      setBooking: setBooking,
      getBooking: getBooking,
      clearBooking: clearBooking,

      setEvent: setEvent,
      getEvent: getEvent,
      clearEvent: clearEvent,

      setFacility: setFacility,
      getFacility: getFacility,
      clearFacility: clearFacility
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

    function setCurrentPage(page) {
      if (!$.isEmptyObject(page)) {
        sessionStorage.currentPage = angular.toJson(page);
      }
    }

    function getCurrentPage() {
      if (sessionStorage.currentPage === "undefined" || $.isEmptyObject(sessionStorage.currentPage)) {
        return undefined;
      }
      else {
        return angular.fromJson(sessionStorage.currentPage);
      }
    }

    function clearCurrentPage() {
      sessionStorage.currentPage = undefined;
    }

    function setServerStatus(status) {
      if (!$.isEmptyObject(status)) {
        sessionStorage.serverStatus = angular.toJson(status);
      }
    }

    function getServerStatus() {
      if (sessionStorage.serverStatus === "undefined" || $.isEmptyObject(sessionStorage.serverStatus)) {
        return undefined;
      }
      else {
        return angular.fromJson(sessionStorage.serverStatus);
      }
    }

    function clearServerStatus() {
      sessionStorage.serverStatus = undefined;
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

    function setEvent(event) {
      if (!$.isEmptyObject(event)) {
        sessionStorage.selectedEvent = angular.toJson(event);
      }
    }

    function getEvent() {
      if (sessionStorage.selectedEvent === "undefined" || $.isEmptyObject(sessionStorage.selectedEvent)) {
        return undefined;
      }
      else {
        return angular.fromJson(sessionStorage.selectedEvent);
      }
    }

    function clearEvent() {
      sessionStorage.selectedEvent = undefined;
    }

    function setFacility(facility) {
      if (!$.isEmptyObject(facility)) {
        sessionStorage.selectedFacility = angular.toJson(facility);
      }
    }

    function getFacility() {
      if (sessionStorage.selectedFacility === "undefined" || $.isEmptyObject(sessionStorage.selectedFacility)) {
        return undefined;
      }
      else {
        return angular.fromJson(sessionStorage.selectedFacility);
      }
    }

    function clearFacility() {
      sessionStorage.selectedFacility = undefined;
    }

    return service;
  }
})();
