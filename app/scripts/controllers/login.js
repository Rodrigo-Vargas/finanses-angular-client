'use strict';

/**
 * @ngdoc function
 * @name finansesApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the finansesApp
 */
angular.module('finansesApp')
  .controller('LoginCtrl', function ($scope, $http, $location, UserInfoService) {
    var currentUserInfo = UserInfoService.get();
    if (currentUserInfo)
    {
      $location.path('/');
      return;
    }    
    $scope.submit = function(isValid){
      $scope.submitted = true;
      if (!isValid)
        return;

      $http(
      {
        method: 'POST',
        url: '/api/users/login',
        data : { user : $scope.formData }
      })
      .then(function success(response){
        if (response.data.success)
        {
          UserInfoService.set(response.data.user);
          $location.path('/');
        }
        else
        {
          $scope.serverMessage = 'Email ou senha inválidos';
        }
      });
    }
  });
