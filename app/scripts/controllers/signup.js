'use strict';

/**
 * @ngdoc function
 * @name finansesApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the finansesApp
 */
angular.module('finansesApp')
  .controller('SignupCtrl', function ($scope, $http, $location, UserInfoService) {
    $scope.submit = function(isValid){
      $scope.submitted = true;
      if (!isValid)
        return;

      $http({
        method: 'POST',
        url: '/api/users',
        data : $scope.formData
      })
      .then(function success(response){
        if (response.data.success)
        {
          UserInfoService.set(response.data.user);
          $location.path('/transactions');
        }
        else
        {
          $scope.serverMessage = "Email já cadastrado"
        }
      },
      function error(response){
        console.log(response);
      });
    }
  });
