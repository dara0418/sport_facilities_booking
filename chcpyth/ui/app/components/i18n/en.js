(function() {
  'use strict';

  angular.module('app.components.i18n')

  .config(englishPack);

  function englishPack($translateProvider) {
    $translateProvider.translations('en', {
      SUCCESS: 'Success',
      ERROR: 'Error',
      INFO: 'Information',

      NAME: 'Name',
      DOB: 'Date of Birth',
      EMAIL: 'Email',
      PHONE: 'Phone',
      CELLPHONE: 'Cellphone',
      PASSWORD: 'Password',
      RE_ENTER: 'Re-enter',
      REGISTER: 'Register',
      LOGIN: 'Sign In',
      UPDATE: 'Update',
      NEW: 'New',
      OLD: 'Old',
      CONFIRM: 'Confirm',
      CHANGE: 'Change',
      RESET: 'Reset',
      URL: 'URL',
      PRIMARY_PHONE: 'Primary Phone Number',
      SECONDARY_PHONE: 'Secondary Phone Number',
      FAX_NUMBER: 'Fax Number',
      CONTENT: 'Content',
      REMOVE_MEMBER: 'Remove Member',
      CHANGE_ROLE: 'Change Role',
      RATE: 'Rate',
      CURRENCY: 'Currency',

      TITLE: 'Title',
      MR: 'Mr.',
      MRS: 'Mrs.',
      MS: 'Ms',

      GENDER: 'Gender',
      MALE: 'Male',
      FEMALE: 'Female',

      STATUS: 'Status',
      ACTIVE: 'Active',
      INACTIVE: 'Inactive',

      ROLE: 'Role',
      ADMIN: 'Administrator',
      PROFESSOR: 'Professor',
      MEMBER: 'Member',

      SPORT_TYPE: 'Sport Type',
      TENNIS: 'Tennis',
      PING_PONG: 'Ping Pong',
      PADDLE: 'Paddle',
      BADMINTON: 'Badminton',
      SQUASH: 'Squash',
      FOOTBALL_5: 'Football-5',

      TIME_UNIT: 'Time Unit',
      MINUTE: 'Minute',
      HOUR: 'Hour',
      DAY: 'Day',
      MONTH: 'Month',
      YEAR: 'Year',

      EMPTY_FIELD: 'You can\'t leave this empty',
      REGISTER_SUCCESS: 'You have registered',
      UNEXPECTED_ERROR: 'We are sorry but some unexpected errors occur',
      SAVE_SUCCESS: 'Save successful',
      UPDATE_SUCCESS: 'Update successful',
      DELETE_SUCCESS: 'Delete successful',
      PASSWORD_CHANGED: 'Password has changed',
      INVITE_PEOPLE: 'Invite people',
      MEMBERSHIP_REQUEST_SENT: 'Membership request has been sent',
      INTERNAL_ERROR: 'We are sorry but there\'s an error',
      MEMBER_NOT_FOUND: 'Couldn\'t find the member with email',
      IS_ALREADY_MEMBER: 'This user is already a member of the club',
      QUIT_CLUB_SUCCESS: 'Quite club success'
    });
  }
})();
