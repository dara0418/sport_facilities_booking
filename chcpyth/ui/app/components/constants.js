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
  })

  .value('ServerStatus', {
    IDLE: 'IDLE',
    GETTING: 'GETTING',
    UPDATING: 'UPDATING',
    ADDING: 'ADDING',
    REMOVING: 'REMOVING',
    LOGIN: 'LOGIN',
    REGISTER: 'REGISTER'
  })

  .value('Pages', {
    NONE: 'NONE',
    MEMBER_PROFILE: 'MEMBER_PROFILE'
  });
})();
