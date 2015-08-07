(function() {
  'use strict';

  angular.module('app.facility.profile')

  .controller('FacilityProfileController', profileController);

  profileController.$inject = ['$scope', 'Notification',
    'Helpers', '$location', 'ExceptionHandler', 'Facility',
    'Storage', 'FacilityRate', '$q'];

  function profileController($scope, Notification,
    Helpers, $location, handler, Facility,
    Storage, FacilityRate, $q) {
    var vm = this;

    vm.activate = activate;
    vm.update = update;
    vm.create = create;
    vm.newRate = newRate;
    vm.removeRate = removeRate;
    vm.close = close;

    vm.facility = $scope.facility;
    vm.rates = [];
    vm.club = Storage.getClub();
    vm.isEdit = true;

    vm.activate();

    // The startup function.
    function activate() {
      Helpers.safeGetLoginMember(vm);

      if ($.isEmptyObject(vm.member)) {
        $location.path('/home');
        return;
      }

      if ($.isEmptyObject(vm.facility)) {
        vm.isEdit = false;

        // Create an empty vm.facility.
        vm.facility = {
          club: vm.club
        };
      }
      else {
        vm.rates = vm.facility.rates;
      }
    }

    function update() {
      if ($.isEmptyObject(vm.facility.ref)) {
        // No ref, quit.
        return;
      }

      new Facility(vm.facility).$update()
      .then(updateRates)
      .then(updateSuccess)
      .catch(handler.generalHandler);
    }

    function create() {
      if (!$.isEmptyObject(vm.facility.ref)) {
        // The facility has a ref, it may be an existing facility.
        return;
      }

      new Facility(vm.facility).$save()
      .then(saveRates)
      .then(saveSuccess)
      .catch(handler.generalHandler);
    }

    function newRate() {
      vm.rates.push(new FacilityRate({
        facility: vm.facility.resource_uri,
        time_unit: 'H',
        rate: 0,
        currency: 'USD'
      }));
    }

    function removeRate(rateToRemove) {
      // Remove a rate in the rate list (not actually remove from backend).
      vm.rates = $.grep(vm.rates, function(rate, index) {
        return rate.ref != rateToRemove.ref;
      });
    }

    function close() {
      $scope.$emit('facility.close');
    }

    // Private functions.

    function updateRates() {
      return removeRates(vm.facility)
      .then(function() {
        saveRates(vm.facility);
      });
    }

    function removeRates(facility) {
      // Remove all existing rates.
      return FacilityRate.get({ facility__ref: facility.ref }).$promise
      .then(function(resource) {
        var deferred = $q.defer();

        var promises = $.map(resource.objects, function(rate, index) {
          return new FacilityRate(rate).$delete();
        });

        $q.all(promises).then(function() {
          deferred.resolve();
        });

        return deferred.promise;
      });
    }

    function saveRates(facility) {
      var deferred = $q.defer();

      var promises = $.map(vm.rates, function(rate, index) {
        // Clear the ref, this will make the server treat the object as a new one.
        rate.ref = undefined;
        rate.facility = facility.resource_uri;
        return new FacilityRate(rate).$save();
      });

      $q.all(promises).then(function() {
        deferred.resolve();
      });

      return deferred.promise;
    }

    function saveSuccess() {
      $scope.$emit('facility.created');

      Notification.notifySuccess('FACILITY_CREATED');
    }

    function updateSuccess() {
      $scope.$emit('facility.updated');

      Notification.notifySuccess('FACILITY_UPDATED');
    }
  }
})();
