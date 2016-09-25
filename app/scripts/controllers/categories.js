'use strict';

/**
 * @ngdoc function
 * @name finansesApp.controller:CategoriesCtrl
 * @description
 * # CategoriesCtrl
 * Controller of the finansesApp
 */
angular.module('finansesApp')
  .controller('CategoriesCtrl', function ($scope, $http, $location, UserInfoService) {
    var currentUserInfo = UserInfoService.get();
    if (!currentUserInfo)
    {
       $location.path('/login');
       return;
    }

    $scope.modalControl = {};

    var headers = {
      'Authorization': 'Token token=' + currentUserInfo.token,
      'Accept': 'application/json;odata=verbose'
    };

    $scope.addCategory = function(){
      $scope.modalControl.open();
    }

    $scope.getCategories = function(){
     $http({
        method: 'GET',
        url: '/api/categories',
        headers : headers
     })
     .then(
        function successCallback(response) {
          $scope.categories = response.data.categories;
        },
        function errorCallback(response) {
           console.log(response);
        }
     );
    }

    $scope.editCategory = function(category){
      $scope.modalControl.formData = category;
      $scope.modalControl.open();
    }

    $scope.destroyCategory = function(categoryId){
     $http({
        method: 'DELETE',
        url: '/api/categories/' + categoryId,
        headers : headers
     })
     .then(
        function successCallback(response) {
          $scope.getCategories();
        },
        function errorCallback(response) {
          console.log(response);
        }
     );
    }

    $scope.modalControl.addCategory = function(){
      var url;
      var method;
      if ($scope.modalControl.formData.id > 0)
      {
        url = '/api/categories/' + $scope.modalControl.formData.id;
        method = 'PATCH';
      }
      else
      {
        url = '/api/categories';
        method = 'POST';
      }        

      $http({
        method: method,
        url: url,
        headers : headers,
        data: { category : $scope.modalControl.formData }
      })
      .then(
        function successCallback(response) {
          $scope.modalControl.formData = {};
          $scope.modalControl.close();
          $scope.getCategories();
        },
        function errorCallback(response) {
          console.log(response);
        }
      );
    }

    $scope.getCategories();
  });
