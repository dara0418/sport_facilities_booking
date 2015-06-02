(function () {
  'use strict';

  angular.module('app.components.input_match', [])

  .directive('inputMatch', directive);

  directive.$inject = ['$parse'];

  function directive($parse) {
    var directive = {
      link: link,
      restrict: 'A',
      require: '?ngModel'
    };

    function link(scope, elem, attrs, ctrl) {
      // if ngModel is not defined, we don't need to do anything.
      if (!ctrl) return;
      if (!attrs['inputMatch']) return;
       
      var firstPassword = $parse(attrs['inputMatch']);
       
      var validator = function (value) {
        var temp = firstPassword(scope);
        var v = value === temp;
        ctrl.$setValidity('match', v);

        return value;
      }
       
      ctrl.$parsers.unshift(validator);
      ctrl.$formatters.push(validator);

      attrs.$observe('inputMatch', function () {
        validator(ctrl.$viewValue);
      });
    }

    return directive;
  }
   
})();
