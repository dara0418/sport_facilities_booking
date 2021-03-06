(function() {
  'use strict';

  /**
   * This module contains reusable functions may be used across the app.
   *
   */
  angular.module('app.components.helpers', [])

  .factory('Helpers', helpersFactory);

  helpersFactory.$inject = ['$location', 'Storage', 'Membership', 'ExceptionHandler',
    '$resource', '$q', 'MembershipRole', 'Notification', 'TimeUnit', 'GeneralValue'];

  function helpersFactory($location, Storage, Membership, ExceptionHandler,
    $resource, $q, MembershipRole, Notification, TimeUnit) {
    var service = {
      safeGetLoginMember: safeGetLoginMember,
      getMembershipsByMemberRef: getMembershipsByMemberRef,
      getClubsByMemberRef: getClubsByMemberRef,
      getMembershipsByClubAndMember: getMembershipsByClubAndMember,
      createMembership: createMembership,
      saveSuccess: saveSuccess,
      updateSuccess: updateSuccess,
      deleteSuccess: deleteSuccess,
      getDayOfWeekStr: getDayOfWeekStr,
      getTimeslotStr: getTimeslotStr,
      getTimeUnitStr: getTimeUnitStr,
      getMonthStr: getMonthStr,
      isString: isString,
      getSportTypeStr: getSportTypeStr,
      getBillingYear: getBillingYear,
      getBillingMonth: getBillingMonth,
      getBillingStatusStr: getBillingStatusStr,
      returnTrue: returnTrue,
      returnFalse: returnFalse,
      getNextFewDays: getNextFewDays,
      buildBookingSlots: buildBookingSlots,
      paddingNumber: paddingNumber,
      makeTimeslot: makeTimeslot,
      getStrOpt: getStrOpt,
      getDurationMins: getDurationMins,
      isHoliday: isHoliday,
      getDayDiff: getDayDiff,
      compareTimeslots: compareTimeslots,
      getDateStr: getDateStr,

      // TODO - This function will be deprecated.
      firstCharToUpperCase: firstCharToUpperCase
    };

    var handler = ExceptionHandler;

    /**
     * Check and get login member object from cache. Redirects to login page
     * if user hasn't signed in.
     *
     * @function
     */
    function safeGetLoginMember(vm) {
      var member = Storage.getLoginMember();

      if (member === undefined) {
        // Invalid login user. Clear cache and redirect to login page.
        Storage.clearLoginMember();
      }

      // Clone the login member.
      vm.member = angular.copy(member);
    }

    /**
     * Query memberships by a member's UUID.
     *
     * @function
     * @param {string} memberRef Member UUID.
     * @returns Array A list of promises holding Membership objects.
     */
    function getMembershipsByMemberRef(memberRef) {
      return Membership.get({ member__ref: memberRef }).$promise;
    }

    /**
     * Query clubs by a member's UUID.
     *
     * @function
     * @param {string} memberRef Member UUID.
     * @returns {Promise} A promise containing Club objects.
     */
    function getClubsByMemberRef(memberRef) {
      // Create a deferred promise and resolve later.
      var clubDeferred = $q.defer();

      getMembershipsByMemberRef(memberRef)
      .then(function(membershipResource) {
        var clubs = $.map(
          membershipResource.objects,
          function(membership, index) {
            return membership.club;
          }
        );

        clubDeferred.resolve(clubs);
      })
      .catch(handler.generalHandler);

      return clubDeferred.promise;
    }

    /**
     * Get memberships by club and member UUID.
     *
     * @function
     * @returns {Promise} A promise containing the found objects. The length of
     *   the objects array should be either 0 or 1. If you got more than 1 objects,
     *   there should be an error in database.
     */
    function getMembershipsByClubAndMember(memberRef, clubRef) {
      var promise = Membership.get({
        member__ref: memberRef,
        club__ref: clubRef
      }).$promise
      .then(function(membershipResource) {
        return membershipResource.objects;
      })

      return promise;
    }

    /**
     * Create membership relation by given membership request.
     *
     * @function
     * @param {Resource} mq Membership request.
     * @returns {Promise} A promise containing the saved membership.
     */
    function createMembership(mq) {
      var membership = {
        club: mq.club,
        member: mq.member,
        role: MembershipRole.MEMBER
      };

      return new Membership(membership).$save();
    }

    function saveSuccess(result) {
      Notification.notifySuccess('SAVE_SUCCESS');
    }

    function updateSuccess(result) {
      Notification.notifySuccess('UPDATE_SUCCESS');
    }

    function deleteSuccess(result) {
      Notification.notifySuccess('DELETE_SUCCESS');
    }

    /**
     * Get day of week string by given number.
     * Should translate it to partiluar language.
     */
    function getDayOfWeekStr(dow) {
      switch (dow) {
        case 0:
          return 'SUNDAY';
        case 1:
          return 'MONDAY';
        case 2:
          return 'TUESDAY';
        case 3:
          return 'WEDNESDAY';
        case 4:
          return 'THURSDAY';
        case 5:
          return 'FRIDAY';
        case 6:
          return 'SATURDAY';
        default:
          return 'UNKNOWN';
      }
    }

    function getTimeslotStr(timeslot) {
      if (isString(timeslot)) {
        // Timeslot should be 4 digits number.
        if (timeslot.length == 4 && !isNaN(timeslot)) {
          // Insert a ':' in the middle.
          return [timeslot.slice(0, 2), ':', timeslot.slice(2)].join('');
        }
      }
      else {
        return 'Error Input';
      }
    }

    function getTimeUnitStr(timeUnit) {
      if (!isString(timeUnit)) {
        return 'Error Input';
      }

      switch (timeUnit) {
        case 'M':
          return 'MINUTE';
        case 'H':
          return 'HOUR';
        case 'D':
          return 'DAY';
        case 'N':
          return 'MONTH';
        case 'Y':
          return 'YEAR';
        default:
          return 'UNKNOWN';
      }
    }

    function getMonthStr(month) {
      if (isNaN(month)) {
        return 'UNKNOWN';
      }

      switch (month) {
        case 0:
          return 'MONTH_JAN';
        case 1:
          return 'MONTH_FEB';
        case 2:
          return 'MONTH_MAR';
        case 3:
          return 'MONTH_APR';
        case 4:
          return 'MONTH_MAY';
        case 5:
          return 'MONTH_JUN';
        case 6:
          return 'MONTH_JUL';
        case 7:
          return 'MONTH_AUG';
        case 8:
          return 'MONTH_SEP';
        case 9:
          return 'MONTH_OCT';
        case 10:
          return 'MONTH_NOV';
        case 11:
          return 'MONTH_DEC';
        default:
          return 'UNKNOWN';
      }
    }

    function isString(s) {
      return typeof(s) === 'string' || s instanceof String;
    }

    function firstCharToUpperCase(str) {
      if (!isString(str)) {
        return 'UNKNOWN';
      }
      else {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
    }

    function getSportTypeStr(sportType) {
      switch (sportType) {
        case 'T':
          return 'TENNIS';
        case 'G':
          return 'PING_PONG';
        case 'D':
          return 'PADDLE';
        case 'B':
          return 'BADMINTON';
        case 'S':
          return 'SQUASH';
        case 'F5':
          return 'FOOTBALL_5';
        default:
          return 'UNKNOWN';
      }
    }

    /**
     * This function parses a billing period string and return its year.
     */
    function getBillingYear(period) {
      // A yearly bill.
      if (period.length == 4) {
        return period;
      }
      // A monthly bill.
      else if (period.length == 6) {
        return period.substring(0, 4);
      }
      else {
        // Don't know what it is.
        return undefined;
      }
    }

    function getBillingMonth(period) {
      // A yearly bill.
      if (period.length == 4) {
        return '';
      }
      // A monthly bill.
      else if (period.length == 6) {
        return getMonthStr( parseInt(period.substring(4)) );
      }
      else {
        // Don't know what it is.
        return undefined;
      }
    }

    function getBillingStatusStr(status) {
      switch (status) {
        case 'P':
          return 'BILL_PENDING';
        case 'S':
          return 'BILL_SUBMITTED';
        case 'C':
          return 'BILL_CONFIRMED';
        case 'A':
          return 'BILL_CANCELED';
        default:
          return 'UNKNOWN';
      }
    }

    /**
     * Get a date array by given begin date and day amount.
     * The begin date will be also pushed into the result array.
     */
    function getNextFewDays(someday, dayAmount) {
      var nextFewDays = [];

      for (var i = 0; i < dayAmount; i++) {
        nextFewDays.push(someday.setDate(someday.getDate() + i));
      }

      return nextFewDays;
    }

    function buildBookingSlots(openTime, closeTime, interval) {
      var openTimeNum = Number(openTime);
      var closeTimeNum = Number(closeTime);
      var slots = [];

      for (var i = openTimeNum; i < closeTimeNum; i=makeTimeslot(i, interval)) {
        slots.push(paddingNumber(i, 4));
      }

      return slots;
    }

    function paddingNumber(num, size) {
      var s = num+"";
      while (s.length < size) s = "0" + s;
      return s;
    }

    function getStrOpt(str) {
      return str === undefined ? '' : str;
    }

    // Interval should be in minutes.
    function makeTimeslot(slot, interval) {
      if (!isNaN(slot) && !isNaN(interval)) {
        var paddingSlot = paddingNumber(slot, 4);

        if (paddingSlot.length != 4) {
          return;
        }

        var hour = paddingSlot.substring(0, 2);
        var min = paddingSlot.substring(2);

        if (Number(min) + interval >= 60) {
          hour = paddingNumber(Number(hour) + Math.floor(interval / 60 + 1), 2);
          min = paddingNumber((Number(min) + interval) % 60, 2);

          return Number(hour + min);
        }
        else {
          return Number(slot + interval);
        }
      }
    }

    function getDurationMins(duration, timeUnit) {
      switch(timeUnit) {
        case TimeUnit.MINUTE:
          return duration;

        case TimeUnit.HOUR:
          return duration * 60;

        case TimeUnit.DAY:
          return duration * 1440;

        case TimeUnit.MONTH:
          // TODO - handle different amounts of days of months.
          return duration * 1440 * 30;

        case TimeUnit.YEAR:
          return duration * 1440 * 365;

        default:
          return 0;
      }
    }

    function isHoliday(dateStr) {
      // At the moment we only check weekends.
      // TODO - Check bank holidays and festivals, which are different from country to country.
      var date = new Date(dateStr);
      return date.getDay() == 6 || date.getDay() == 0;
    }

    function getDayDiff(date1, date2) {
      var utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
      var utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

      return Math.floor((utc2 - utc1) / GeneralValue.MS_PER_DAY);
    }

    function compareTimeslots(slot1, slot2) {
      return Number(slot1) - Number(slot2);
    }

    // Get a Django friendly date string.
    function getDateStr(dateStr) {
      var date = new Date(dateStr);
      return date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' +
        ("0" + (date.getDate() + 1)).slice(-2);
    }

    function returnTrue() {
      return true;
    }

    function returnFalse() {
      return false;
    }

    return service;
  }

})();
