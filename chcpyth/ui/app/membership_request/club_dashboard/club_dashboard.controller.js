(function() {
  'use strict';

  angular.module('app.membership_request.club_dashboard')

  .controller('MembershipRequestClubDashboardController', clubDashboardController);

  clubDashboardController.$inject = ['$scope', 'Notification', '$translate', 'MembershipRequest',
    'Helpers', 'SharedProperties', 'ExceptionHandler', 'MembershipRequestStatus',
    'MembershipRequestType', 'Membership', 'MembershipRole', 'Member', 'Config', '$q'];

  function clubDashboardController($scope, Notification, $translate, MembershipRequest,
    Helpers, SharedProperties, ExceptionHandler, MembershipRequestStatus,
    MembershipRequestType, Membership, MembershipRole, Member, Config, $q) {
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

      vm.selectedClub = angular.copy(SharedProperties.selectedClub);

      // Pull membership requests of the selected club.
      if (!$.isEmptyObject(vm.selectedClub)) {
        MembershipRequest.get({ club__ref: vm.selectedClub.ref }).$promise
        .then(setMembershipRequests)
        .catch(handler.generalHandler);
      }
    }

    function sendMembershipRequest() {
      Member.get({ email: vm.inviteEmail }).$promise
      .then(checkMemberExists)
      .then(checkMembershipExists)
      .then(createMembershipRequest)
      .then(membershipRequestSent)
      .catch(handler.generalHandler);
    }

    function acceptRequest(mq) {
      if (mq.status != vm.mqStatus.PENDING ||
        mq.request_type != vm.mqType.MEMBER_REQUEST) {
        // TODO - Notify messages using translator.
        Notification.notifyFailure('');
        return;
      }

      mq.status = vm.mqStatus.APPROVED;
      new MembershipRequest(mq).$update()
      .then(helpers.createMembership)
      .then(Helpers.updateSuccess)
      .catch(handler.generalHandler);
    }

    // Private functions.

    function checkMemberExists(memberResource) {
      var members = memberResource.objects;

      if (members.length != 1) {
        // Member not found, or duplicate members found (although this is sort of impossible).
        return $q.reject({
          errorMsg: 'MEMBER_NOT_FOUND',
          suffix: vm.inviteEmail
        });
      }

      return members[0];
    }

    function checkMembershipExists(member) {
      Helpers.getMembershipsByClubAndMember(member.ref, vm.selectedClub.ref)
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

    function createMembershipRequest(member) {
      var mq = {
        member: member,
        club: vm.selectedClub,
        request_type: vm.mqType.CLUB_INVITATION,
        status: vm.mqStatus.PENDING,
        content: vm.content
      };

      return new MembershipRequest(mq).$save();
    }

    function setMembershipRequests(membershipRequestResources) {
      vm.mqs = membershipRequestResources.objects;
    }

    function membershipRequestSent(result) {
      Notification.notifySuccess('MEMBERSHIP_REQUEST_SENT');
    }
  }
})();
