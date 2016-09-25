'use strict';

/**
 * @ngdoc function
 * @name finansesApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the finansesApp
 */
angular.module('finansesApp')
  .controller('LogoutCtrl', function ($location, UserInfoService) {
    UserInfoService.clear();
    $location.path('/login');
  });
