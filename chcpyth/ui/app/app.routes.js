(function() {
  'use strict';

  angular.module('app.routes', [])

  .config(routeConfig);

  routeConfig.$inject = ['$routeProvider'];

  function routeConfig($routeProvider) {
    $routeProvider
      .when (
        '/member/register', {
          templateUrl: 'app/member/register/register.html',
          controller: 'MemberRegisterController',
          controllerAs: 'vm'
        }
      )
      .when (
        '/member/login', {
          templateUrl: 'app/member/login/login.html',
          controller: 'MemberLoginController',
          controllerAs: 'vm'
        }
      )
      .when (
        '/member/profile', {
          templateUrl: 'app/member/profile/profile.html',
          controller: 'MemberProfileController',
          controllerAs: 'vm'
        }
      )
      .when (
        '/member/change_password', {
          templateUrl: 'app/member/password/password.html',
          controller: 'MemberPasswordController',
          controllerAs: 'vm'
        }
      )
      .when (
        '/club/profile', {
          templateUrl: 'app/club/profile/profile.html',
          controller: 'ClubProfileController',
          controllerAs: 'vm'
        }
      )
      .when (
        '/club/dashboard', {
          templateUrl: 'app/club/dashboard/dashboard.html',
          controller: 'ClubDashboardController',
          controllerAs: 'vm'
        }
      )
      .when (
        '/club/bill', {
          templateUrl: 'app/club/bill/bill.html',
          controller: 'ClubBillController',
          controllerAs: 'vm'
        }
      )
      .when (
        '/facility/dashboard', {
          templateUrl: 'app/facility/dashboard/dashboard.html',
          controller: 'FacilityDashboardController',
          controllerAs: 'vm'
        }
      )
      .when (
        '/facility/profile', {
          templateUrl: 'app/facility/profile/profile.html',
          controller: 'FacilityProfileController',
          controllerAs: 'vm'
        }
      )
      .when (
        '/general_rule/dashboard', {
          templateUrl: 'app/general_rule/dashboard/dashboard.html',
          controller: 'GeneralRuleDashboardController',
          controllerAs: 'vm'
        }
      )
      .when (
        '/general_rule/profile', {
          templateUrl: 'app/general_rule/profile/profile.html',
          controller: 'GeneralRuleProfileController',
          controllerAs: 'vm'
        }
      )
      .when (
        '/sport_rule/dashboard', {
          templateUrl: 'app/sport_rule/dashboard/dashboard.html',
          controller: 'SportRuleDashboardController',
          controllerAs: 'vm'
        }
      )
      .when (
        '/sport_rule/profile', {
          templateUrl: 'app/sport_rule/profile/profile.html',
          controller: 'SportRuleProfileController',
          controllerAs: 'vm'
        }
      )
      .when (
        '/facility_rule/dashboard', {
          templateUrl: 'app/facility_rule/dashboard/dashboard.html',
          controller: 'FacilityRuleDashboardController',
          controllerAs: 'vm'
        }
      )
      .when (
        '/facility_rule/profile', {
          templateUrl: 'app/facility_rule/profile/profile.html',
          controller: 'FacilityRuleProfileController',
          controllerAs: 'vm'
        }
      )
      .when (
        '/club_rate/dashboard', {
          templateUrl: 'app/club_rate/dashboard/dashboard.html',
          controller: 'ClubRateDashboardController',
          controllerAs: 'vm'
        }
      )
      .when (
        '/club_rate/profile', {
          templateUrl: 'app/club_rate/profile/profile.html',
          controller: 'ClubRateProfileController',
          controllerAs: 'vm'
        }
      )
      .when (
        '/facility_rate/dashboard', {
          templateUrl: 'app/facility_rate/dashboard/dashboard.html',
          controller: 'FacilityRateDashboardController',
          controllerAs: 'vm'
        }
      )
      .when (
        '/facility_rate/profile', {
          templateUrl: 'app/facility_rate/profile/profile.html',
          controller: 'FacilityRateProfileController',
          controllerAs: 'vm'
        }
      )
      .when (
        '/event/club_dashboard', {
          templateUrl: 'app/event/club_dashboard/club_dashboard.html',
          controller: 'EventClubDashboardController',
          controllerAs: 'vm'
        }
      )
      .when (
        '/event/member_dashboard', {
          templateUrl: 'app/event/member_dashboard/member_dashboard.html',
          controller: 'EventMemberDashboardController',
          controllerAs: 'vm'
        }
      )
      .when (
        '/event/profile', {
          templateUrl: 'app/event/profile/profile.html',
          controller: 'EventProfileController',
          controllerAs: 'vm'
        }
      )
      .when (
        '/booking/club_dashboard', {
          templateUrl: 'app/booking/club_dashboard/club_dashboard.html',
          controller: 'BookingClubDashboardController',
          controllerAs: 'vm'
        }
      )
      .when (
        '/booking/profile', {
          templateUrl: 'app/booking/profile/profile.html',
          controller: 'BookingProfileController',
          controllerAs: 'vm'
        }
      )
      .when (
        '/membership/dashboard', {
          templateUrl: 'app/membership/dashboard/dashboard.html',
          controller: 'MembershipDashboardController',
          controllerAs: 'vm'
        }
      )
      .when (
        '/membership_request/club_dashboard', {
          templateUrl: 'app/membership_request/club_dashboard/club_dashboard.html',
          controller: 'MembershipRequestClubDashboardController',
          controllerAs: 'vm'
        }
      )
      .when (
        '/membership_request/member_dashboard', {
          templateUrl: 'app/membership_request/member_dashboard/member_dashboard.html',
          controller: 'MembershipRequestMemberDashboardController',
          controllerAs: 'vm'
        }
      )
      .when (
        '/subscription_plan/dashboard', {
          templateUrl: 'app/subscription_plan/dashboard/dashboard.html',
          controller: 'SubscriptionPlanDashboardController',
          controllerAs: 'vm'
        }
      )
      .otherwise ({
        redirectTo: '/landing'
      })
  }
})();
