(function() {
  'use strict';

  angular.module('app.routes', [])

  .config(routeConfig);

  routeConfig.$inject = ['$routeProvider'];

  function routeConfig($routeProvider) {
    $routeProvider
      .when (
        '/home', {
          templateUrl: 'app/landing/landing.html'
        }
      )
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
        '/member/dashboard', {
          templateUrl: 'app/member/dashboard/dashboard.html',
          controller: 'MemberDashboardController',
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
        '/booking/dashboard', {
          template: '<booking-dashboard></booking-dashboard>',
          controller: 'BookingDashboardController',
          controllerAs: 'vm'
        }
      )
      .otherwise ({
        redirectTo: '/home'
      });
  }
})();
