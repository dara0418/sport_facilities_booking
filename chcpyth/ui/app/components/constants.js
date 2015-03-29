(function() {
  'use strict';

  angular.module('app.components.constants', [])

  .value('MembershipRole', {
    ADMIN: 'A',
    PROFESSOR: 'P',
    MEMBER: 'M'
  })

  .value('MembershipRequestStatus', {
    PENDING: 'P',
    APPROVED: 'A',
    IGNORED: 'I',
    REJECT: 'R'
  })

  .value('MembershipRequestType', {
    MEMBER_REQUEST: 'MR',
    CLUB_INVITATION: 'CI'
  });
})();
