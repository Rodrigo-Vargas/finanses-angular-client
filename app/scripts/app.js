'use strict';

/**
 * @ngdoc overview
 * @name finansesApp
 * @description
 * # finansesApp
 *
 * Main module of the application.
 */
angular
  .module('finansesApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angularFileUpload',
    'ui.bootstrap',
    'ngMask'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/importadores', {
        templateUrl: 'views/importers.html',
        controller: 'ImportersCtrl',
        controllerAs: 'importers'
      })
      .when('/categorias', {
        templateUrl: 'views/categories.html',
        controller: 'CategoriesCtrl',
        controllerAs: 'categories'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'signup'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl',
        controllerAs: 'logout'
      })
      .otherwise({
        redirectTo: '/'
      });

      $locationProvider.html5Mode(true);
  })
  .filter('money', function(){
    return function(input, unit, decimalPlaces, decimalUnit) {
      var output = String(input);

      if (decimalPlaces)
      {
        var outputArray = output.split('');
        var spliced = outputArray.splice(outputArray.length-decimalPlaces);

        outputArray = outputArray.concat([decimalUnit]);
        outputArray = outputArray.concat(spliced);
        output = outputArray.join('');
      }

      if (unit)
        output = unit + output;
      else
        output = "$" + output;

      return output;
    }
  })
  .factory('UserInfoService', function($cookies) {
    var userInfo;

    return {
      get : function(){
        if (!userInfo)
        {
          if ($cookies.get('userInfo'))
            userInfo = JSON.parse($cookies.get('userInfo'));
        }

        return userInfo;
      },
      set : function(value){
        userInfo = value;

        var expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 60);
        $cookies.put('userInfo', JSON.stringify(userInfo), {'expires' : expirationDate });
      },
      clear: function() {
        console.log('Clear!');
        userInfo = null;
        $cookies.remove('userInfo');
      }
    };
  })
  .directive('rvgModal', function(){
    return {
      restrict: 'E',
      replace: true,
      templateUrl: function(elem, attr){
        return "/" + attr.templateUrl;
      },
      scope: {
        control: '='
      },
      link: function(scope, element, attrs) {
        scope.internalControl = scope.control || {};
        scope.opened = false;

        scope.internalControl.open = function() {
          scope.opened = true;
        }

        scope.internalControl.close = function(){
          scope.opened = false;
          scope.$emit('modalClose');
        }
      }
    }
  })
  .directive('colorPicker', function(){
    return {
      restrict: 'E',
      replace: true,
      templateUrl: function(elem, attr){
        return "/" + attr.templateUrl;
      },
      scope: {
        ngModel: '='
      },
      link: function(scope, element, attrs, ctrl){
        scope.showPallete = false;

        scope.colors = [
                          { code : 'rgb(128, 128, 128)' },
                          { code : 'rgb(240, 240, 240)' },
                          { code : 'rgb(255, 214, 214)' },
                          { code : 'rgb(255, 214, 173)' },
                          { code : 'rgb(255, 240, 225)' },
                          { code : 'rgb(227, 243, 198)' },
                          { code : 'rgb(163, 234, 194)' },
                          { code : 'rgb(154, 222, 223)' },
                          { code : 'rgb(221, 255, 255)' },
                          { code : 'rgb(213, 214, 255)' },
                          { code : 'rgb(255, 213, 255)' },
                          { code : 'rgb(219, 223, 220)' },
                          { code : 'rgb(255, 157, 157)' },
                          { code : 'rgb(255, 189, 92)' },
                          { code : 'rgb(254, 233, 183)' },
                          { code : 'rgb(218, 238, 142)' },
                          { code : 'rgb(130, 215, 172)' },
                          { code : 'rgb(37, 213, 186)' },
                          { code : 'rgb(82, 214, 255)' },
                          { code : 'rgb(171, 172, 255)' },
                          { code : 'rgb(255, 171, 255)' },
                          { code : 'rgb(202, 207, 210)' },
                          { code : 'rgb(255, 133, 133)' },
                          { code : 'rgb(237, 152, 54)' },
                          { code : 'rgb(251, 217, 133)' },
                          { code : 'rgb(141, 212, 127)' },
                          { code : 'rgb(75, 207, 153)' },
                          { code : 'rgb(70, 193, 160)' },
                          { code : 'rgb(57, 196, 255)' },
                          { code : 'rgb(131, 132, 216)' },
                          { code : 'rgb(215, 131, 215)' },
                          { code : 'rgb(170, 183, 184)' },
                          { code : 'rgb(245, 81, 66)' },
                          { code : 'rgb(250, 135, 62)' },
                          { code : 'rgb(255, 215, 25)' },
                          { code : 'rgb(190, 222, 52)' },
                          { code : 'rgb(41, 194, 135)' },
                          { code : 'rgb(66, 181, 177)' },
                          { code : 'rgb(0, 122, 193)' },
                          { code : 'rgb(110, 96, 187)' },
                          { code : 'rgb(205, 111, 206)' },
                          { code : 'rgb(137, 149, 161)' },
                          { code : 'rgb(222, 106, 103)' },
                          { code : 'rgb(220, 118, 51)' },
                          { code : 'rgb(252, 184, 19)' },
                          { code : 'rgb(167, 203, 52)' },
                          { code : 'rgb(158, 221, 148)' },
                          { code : 'rgb(60, 193, 191)' },
                          { code : 'rgb(108, 145, 200)' },
                          { code : 'rgb(114, 106, 175)' },
                          { code : 'rgb(175, 121, 198)' },
                          { code : 'rgb(86, 101, 115)' },
                          { code : 'rgb(225, 75, 70)' },
                          { code : 'rgb(198, 97, 54)' },
                          { code : 'rgb(216, 173, 87)' },
                          { code : 'rgb(136, 181, 56)' },
                          { code : 'rgb(72, 156, 111)' },
                          { code : 'rgb(67, 139, 131)' },
                          { code : 'rgb(95, 116, 176)' },
                          { code : 'rgb(106, 99, 153)' },
                          { code : 'rgb(137, 92, 169)' },
                          { code : 'rgb(76, 86, 97)' },
                          { code : 'rgb(171, 83, 73)' },
                          { code : 'rgb(157, 75, 72)' },
                          { code : 'rgb(174, 133, 90)' },
                          { code : 'rgb(113, 154, 56)' },
                          { code : 'rgb(67, 122, 88)' },
                          { code : 'rgb(70, 124, 110)' },
                          { code : 'rgb(48, 76, 143)' },
                          { code : 'rgb(96, 87, 145)' },
                          { code : 'rgb(112, 81, 140)' }
                        ];

        scope.openPalette = function(){
          scope.showPallete = true;
        }

        scope.selectColor = function(selectedColor){
          scope.showPallete = false;
          scope.ngModel = selectedColor.code;
        }
      }
    }
  });
