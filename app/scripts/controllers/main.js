'use strict';

/**
 * @ngdoc function
 * @name finansesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the finansesApp
 */
angular.module('finansesApp')
  .controller('MainCtrl', function ($scope, $http, $location, UserInfoService) {
      $scope.currentUserInfo = UserInfoService.get();

      if (!$scope.currentUserInfo)
      {
         $location.path('/login');
         return;
      }

      $scope.months =   [
                           { id : 1,  name : "Janeiro" },
                           { id : 2,  name : "Fevereiro" },
                           { id : 3,  name : "Março" },
                           { id : 4,  name : "Abril" },
                           { id : 5,  name : "Maio" },
                           { id : 6,  name : "Junho" },
                           { id : 7,  name : "Julho" },
                           { id : 8,  name : "Agosto" },
                           { id : 9,  name : "Setembro" },
                           { id : 10, name : "Outubro" },
                           { id : 11, name : "Novembro" },
                           { id : 12, name : "Dezembro" },
                        ];
      $scope.years = [2011, 2012, 2013, 2014, 2015, 2016];


      $scope.modalControl = {};
      $scope.transactions = [];
      $scope.selectedMonth = { id : new Date().getMonth() + 1 };
      $scope.selectedYear = new Date().getFullYear();
      $scope.loadings = 0;
      
      var headers = {
         'Authorization': 'Token token=' + $scope.currentUserInfo.token,
         'Accept': 'application/json;odata=verbose'
      };

      $scope.getCategories = function(){
         $scope.loadings++;
         $http({
            method: 'GET',
            url: '/api/categories',
            headers : headers
         })
         .then(
            function successCallback(response) {
               $scope.loadings--;
               $scope.modalControl.categories = response.data.categories;
            },
            function errorCallback(response) {
               $scope.loadings--;
               console.log(response);
            }
         );
      }

      $scope.getTransactions = function(){
         $scope.loadings++;
         $http({
            method: 'GET',
            url: '/api/transactions/period/' + $scope.selectedMonth.id + '/' + $scope.selectedYear,
            headers : headers
         })
         .then(
            function successCallback(response) {
               $scope.loadings--;
               $scope.transactions = response.data.transactions;
            },
            function errorCallback(response) {
               $scope.loadings--;
               console.log(response);
            }
         );
      }

      $scope.monthChange = function(){
         $scope.getTransactions();
      }

      $scope.yearChange = function(){
         $scope.getTransactions();
      }

      $scope.destroyTransaction = function(transactionId){
         if (!confirm('Are you sure?'))
            return;

         $http({
            method: 'DELETE',
            url: '/api/transactions/' + transactionId,
            headers : headers
         })
         .then(
            function successCallback(response) {
               $scope.getTransactions();
            },
            function errorCallback(response) {
               console.log(response);
            }
         );
      }

      $scope.editTransaction = function(transaction){
         $scope.modalControl.formData = {
            description : transaction.description,
            value : transaction.value,
            date : transaction.date,
            id : transaction.id
         }
         $scope.modalControl.open();
      }

      $scope.addTransaction = function(){
         $scope.modalControl.formData = {};
         $scope.modalControl.formData.date = $scope.format(new Date(), 'dd/MM/yyyy');
         $scope.modalControl.open();
      }

      $scope.format = function(date, mask){
         var stringDate = mask;

         var day = date.getDate();
         if (day < 10)
            day = '0' + day;

         var month = date.getMonth() + 1;
         if (month < 10)
            month = '0' + month;

         stringDate = stringDate.replace("dd", day);
         stringDate = stringDate.replace("MM", month);
         stringDate = stringDate.replace("yyyy", date.getFullYear());
         
         return stringDate;
      }

      $scope.modalControl.addTransaction = function() {
         var url;
         if ($scope.modalControl.formData.id > 0)
            url = '/api/transactions/edit/' + $scope.modalControl.formData.id;
         else
            url = '/api/transactions';

         $http({
            method: 'POST',
            url: url,
            headers : headers,
            data: { transaction : $scope.modalControl.formData }
         })
         .then(
            function successCallback(response) {
               $scope.modalControl.formData = {};
               $scope.modalControl.close();
               $scope.getTransactions();
            },
            function errorCallback(response) {
               console.log(response);
            }
         );
      };

      $scope.getCategories();
      $scope.getTransactions();
  });
