(function() {
  'use strict';

  angular.module('app.membership_request.member_dashboard')

  .controller('MembershipRequestMemberDashboardController', memberDashboardController);

  memberDashboardController.$inject = ['$scope', 'Notification', '$translate', 'Club',
    'Helpers', 'SharedProperties', 'ExceptionHandler', 'MembershipRequestStatus',
    'MembershipRequestType', 'MembershipRequest', 'Membership', '$q'];

  function memberDashboardController($scope, Notification, $translate, Club,
    Helpers, SharedProperties, ExceptionHandler, MembershipRequestStatus,
    MembershipRequestType, MembershipRequest, Membership, $q) {
    var vm = this;

    var handler = ExceptionHandler;

    vm.mqStatus = MembershipRequestStatus
    vm.mqType = MembershipRequestType
    vm.acceptRequest = acceptRequest;
    vm.sendMembershipRequest = sendMembershipRequest;
    vm.activate = activate;

    vm.activate();

    function activate() {
      Helpers.safeGetLoginMember(vm);

      // Pull membership requests of the login member.
      MembershipRequest.get({ member__ref: vm.member.ref }).$promise
      .then(setMembershipRequests)
      .catch(handler.generalHandler);
    }

    function acceptRequest(mq) {
      if (mq.status != vm.mqStatus.PENDING ||
        mq.request_type != vm.mqType.CLUB_INVITATION) {
        // TODO - Notify messages using translator.
        Notification.notifyFailure('');
        return;
      }

      mq.status = vm.mqStatus.APPROVED;
      new MembershipRequest(mq).$update()
      .then(Helpers.createMembership)
      .then(Helpers.updateSuccess)
      .catch(handler.generalHandler);
    }

    function sendMembershipRequest() {
      Club.get({ name: vm.clubName }).$promise
      .then(checkClubExists)
      .then(checkMembershipExists)
      .then(createMembershipRequest)
      .then(membershipRequestSent)
      .catch(handler.generalHandler);
    }

    // Private functions.

    function checkClubExists(clubResource) {
      var clubs = clubResource.objects;

      if (clubs.length == 0) {
        return $q.reject({
          errorMsg: 'CLUB_NOT_FOUND',
          suffix: vm.clubName
        });
      }

      return clubs[0];
    }

    function checkMembershipExists(club) {
      Helpers.getMembershipsByClubAndMember(vm.member.ref, club.ref)
      .then(function(memberships) {
        if (memberships.length > 0) {
          // Already has membership relationship, reject the promise.
          return $q.reject({ errorMsg: 'IS_ALREADY_MEMBER' });
        }
        else {
          return member;
        }
      });

      return promise;
    }

    function setMembershipRequests(membershipRequestResource) {
      vm.mqs = membershipRequestResource.objects;
    }

    function createMembershipRequest(club) {
      var mq = {
        member: vm.member,
        club: club,
        request_type: vm.mqType.MEMBER_REQUEST,
        status: vm.mqStatus.PENDING,
        content: vm.content
      };

      return new MembershipRequest(mq).$save();
    }

    function membershipRequestSent(result) {
      Notification.notifySuccess('MEMBERSHIP_REQUEST_SENT');
    }
  }
})();
