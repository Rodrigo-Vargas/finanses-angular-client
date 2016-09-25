'use strict';

/**
 * @ngdoc function
 * @name finansesApp.controller:ImportersCtrl
 * @description
 * # ImportersCtrl
 * Controller of the finansesApp
 */
angular.module('finansesApp')
  .controller('ImportersCtrl', function ($scope, $http, $location, UserInfoService, FileUploader) {
      $scope.currentUserInfo = UserInfoService.get();
      if (!$scope.currentUserInfo)
      {
         $location.path('/login');
         return;
      }
      var uploader = $scope.uploader = new FileUploader({
         url: '/api/upload'
      });

      var headers = {
         'Authorization': 'Token token=' + $scope.currentUserInfo.token,
         'Accept': 'application/json;odata=verbose'
      };

      $scope.importItem = function(transaction, index){
         $http({
            method: 'POST',
            url: '/api/transactions',
            headers : headers,
            data: { transaction : transaction.original }
         })
         .then(
            function successCallback(response) {
               $scope.importedTransactions.splice(index, 1);
            },
            function errorCallback(response) {
               console.log(response);
            }
         );
      }

      $scope.removeItem = function(index){
         $scope.importedTransactions.splice(index, 1);
      }

      uploader.onAfterAddingFile = function(fileItem){
         fileItem.upload();
      }

      uploader.onBeforeUploadItem = function(item) {
         item.headers = headers;
      };
      uploader.onCompleteItem = function(fileItem, response, status, headers) {
         $scope.importedTransactions = response;
      };
  });
