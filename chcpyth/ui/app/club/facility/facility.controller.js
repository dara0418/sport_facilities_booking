(function() {
  'use strict';

  angular.module('app.club.facility')

  .controller('ClubFacilityController', controller);

  controller.$inject = ['$scope', 'Helpers', '$location', 'ExceptionHandler',
    'Facility', 'Storage', 'FacilityRate', '$q', '$modal'];

  function controller($scope, Helpers, $location, ExceptionHandler,
    Facility, Storage, FacilityRate, $q, $modal) {
    var vm = this;

    var handler = ExceptionHandler;

    vm.createFacility = createFacility;
    vm.editFacility = editFacility;
    vm.activate = activate;
    vm.goToFacilityRule = goToFacilityRule;

    vm.facilityProfileModal = $modal({
      scope: $scope,
      template: 'app/facility/profile/profile.modal.html',
      show: false,
      placement: 'center'
    });

    $.each(['facility.created', 'facility.updated', 'facility.deleted',
      'facility.close', 'modal.hide'],
      function(index, event) {
        $scope.$on(event, function() {
          vm.facilityProfileModal.hide();
          loadFacilities();
        });
      });

    vm.club = Storage.getClub();

    vm.facilities = [];

    vm.activate();

    // The startup function.
    function activate() {
      Helpers.safeGetLoginMember(vm);

      if ($.isEmptyObject(vm.member)) {
        $location.path('/home');
        return;
      }

      loadFacilities();
    }

    // TODO - CURRENTLY DISABLED.
    function goToFacilityRule(facility) {
      Storage.setFacility(facility);

      $location.path('/facility_rule/dashboard');
    }

    function editFacility(facility) {
      if ($.isEmptyObject(facility)) {
        // No facility selected, quit.
        return;
      }

      Storage.setFacility(facility);
    }

    function createFacility() {
      vm.facilityProfileModal.show();
    }

    // Private functions.

    function loadFacilities() {
      // Pull facilities&facility rates of the current selected club.
      if (!$.isEmptyObject(vm.club.ref)) {
        Facility.get({ club__ref: vm.club.ref }).$promise
        .then(getFacilityRates)
        .then(setFacilities)
        .catch(handler.generalHandler);
      }
    }

    function getFacilityRates(resource) {
      var deferred = $q.defer();

      var facilities = $.map(resource.objects, function(facility, index) {

        return FacilityRate.get({ facility__ref: facility.ref }).$promise
        .then(function(rateResource) {
          facility.rates = rateResource.objects;

          return facility;
        });
      });

      $q.all(facilities).then(function(data) {
        deferred.resolve(data);
      });

      return deferred.promise;
    }

    function setFacilities(facilities) {
      vm.facilities = facilities;
    }
  }
})();
