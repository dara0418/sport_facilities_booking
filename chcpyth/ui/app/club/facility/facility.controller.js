(function() {
  'use strict';

  angular.module('app.club.facility')

  .controller('ClubFacilityController', controller);

  controller.$inject = ['$scope', 'Helpers', '$location', 'ExceptionHandler',
    'Facility', 'Storage', 'FacilityRate', '$q'];

  function controller($scope, Helpers, $location, ExceptionHandler,
    Facility, Storage, FacilityRate, $q) {
    var vm = this;

    var handler = ExceptionHandler;

    vm.createFacility = createFacility;
    vm.editFacility = editFacility;
    vm.activate = activate;
    vm.goToFacilityRule = goToFacilityRule;

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

      // Pull facilities&facility rates of the current selected club.
      if (!$.isEmptyObject(vm.club.ref)) {
        Facility.get({ club__ref: vm.club.ref }).$promise
        .then(getFacilityRates)
        .then(setFacilities)
        .catch(handler.generalHandler);
      }
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
    }

    // Private functions.

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
