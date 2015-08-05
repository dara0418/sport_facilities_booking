(function() {
  'use strict';

  angular.module('app.membership.invitation')

  .controller('MembershipInvitationController', controller);

  controller.$inject = ['$scope',  'Helpers', 'ExceptionHandler',
    'Storage', '$location', 'Member', 'Membership', '$timeout',
    'MembershipRequest'];

  function controller($scope, Helpers, ExceptionHandler,
    Storage, $location, Member, Membership, $timeout,
    MembershipRequest) {
    var vm = this;

    var handler = ExceptionHandler;

    vm.activate = activate;
    vm.searchMember = searchMember;
    vm.pendingMembers = [];
    vm.members = [];
    vm.club = Storage.getClub();

    // Save last change timestamp to avoid too frequently queries,
    // e.g. when a user is typing continuously.
    vm.lastChangeTS = Date.now();
    vm.queryProise = undefined;

    $scope.$on('membership.invited', function() {
      // Refresh everything.
      loadPendingRequests();
      loadClubMembers();
      searchMember();
    });

    vm.activate();

    function activate() {
      if ($.isEmptyObject(vm.club)) {
        $location.path('/home');
        return;
      }

      loadPendingRequests();
      loadClubMembers();
    }

    function searchMember() {
      // Clear the results.
      vm.members = [];

      // Don't search if keyword is shorter than 2.
      if (vm.keyword.length < 2) {
        return;
      }

      // If previous query promise is still pending, then cancel it.
      if (vm.queryProise !== undefined && vm.queryProise.$$state.status == 0) {
        $timeout.cancel(vm.queryProise);
      }

      // NOTE: Date.now() is not compitable with IE8 and below.
      var nowTS = Date.now();

      // A delayed query promise, allows 1.5s to wait for user input.
      var promise = $timeout(function() {
        searchByName(vm.keyword);
      }, 1500);

      vm.queryProise = promise;
    }

    // Private functions.

    function searchByName(keyword) {
      Member.searchByName({ keyword: keyword }).$promise
      .then(function(members) {
        $.each(members, function(index, member) {
          if ($.inArray(member.ref, vm.clubMemberRefs) >= 0) {
            member.isInvited = Helpers.returnFalse;
            member.isClubMember = Helpers.returnTrue;
          }
          else if ($.inArray(member.ref, vm.pendingMemberRefs) >= 0) {
            // Pending members.
            member.isInvited = Helpers.returnTrue;
            member.isClubMember = Helpers.returnFalse;
          }
          else {
            member.isInvited = Helpers.returnFalse;
            member.isClubMember = Helpers.returnFalse;
          }

          vm.members.push(member);
        });
      })
      .catch(handler.generalHandler);
    }

    // TODO - Remove this function if not using.
    function searchByEmail(keyword) {
      Member.searchByEmail({ keyword: keyword }).$promise
      .then(function(members) {
        vm.members = vm.members.concat(members);
      })
      .catch(handler.generalHandler);
    }

    function loadPendingRequests() {
      // Pull pending requests.
      MembershipRequest.get({
        club__ref: vm.club.ref,
        status: 'P' // Only query pending requests.
      }).$promise
      .then(setMembershipRequests)
      .catch(handler.generalHandler);
    }

    function loadClubMembers() {
      // Pull club members.
      Membership.get({ club__ref: vm.club.ref }).$promise
      .then(setClubMembers)
      .catch(handler.generalHandler);
    }

    function setMembershipRequests(resource) {
      vm.pendingMemberRefs = [];

      $.each(resource.objects, function(index, msr) {
        vm.pendingMemberRefs.push(msr.member.ref);
      });
    }

    function setClubMembers(resource) {
      vm.clubMemberRefs = [];

      $.each(resource.objects, function(index, ms) {
        vm.clubMemberRefs.push(ms.member.ref);
      });
    }
  }
})();
