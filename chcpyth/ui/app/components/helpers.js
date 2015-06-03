(function() {
  'use strict';

  /**
   * This module contains reusable functions may be used across the app.
   *
   */
  angular.module('app.components.helpers', [])

  .factory('Helpers', helpersFactory);

  helpersFactory.$inject = ['$location', 'Storage', 'Membership', 'ExceptionHandler',
    '$resource', '$q', 'MembershipRole', 'Notification'];

  function helpersFactory($location, Storage, Membership, ExceptionHandler,
    $resource, $q, MembershipRole, Notification) {
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
      isString: isString
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
            // Attach role of club.
            var club = membership.club;
            club.role = membership.role;

            return club;
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

    return service;
  }

})();
