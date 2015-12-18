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
    REGISTER: 'REGISTER',
    CHANGE_PASSWORD: 'CHANGE_PASSWORD'
  })

  .value('Pages', {
    NONE: 'NONE',
    MEMBER_PROFILE: 'MEMBER_PROFILE'
  })

  .value('TimeUnit', {
    MINUTE: 'M',
    HOUR: 'H',
    DAY: 'D',
    MONTH: 'N',
    YEAR: 'Y'
  })

  .value('SportType', {
    TENNIS: 'T',
    PING_PONG: 'G',
    PADDLE: 'D',
    BADMINTON: 'B',
    SQUASH: 'S',
    FOOTBALL_5: 'F5'
  })

  .value('GeneralValue', {
    MS_PER_DAY: 1000 * 60 * 60 * 24
  });
})();
