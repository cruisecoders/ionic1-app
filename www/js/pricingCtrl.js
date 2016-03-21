angular.module('app.projectX').controller('pricingCtrl', function($rootScope, projectApi, $scope){
		$scope.refData = {};	

		$scope.getAllRates = function(id, exp){
		    projectApi.getResource('getAllRates', id, exp).then(function(response){
		        console.log("Suuccess Handler");
		        $scope.refData.rates = response.data;
		      }, function(error){
		        console.log("Failure Handler");
		         if(error.data.errorMsg){
		             $rootScope.showAlertBox('Please try again' , error.data.errorMsg);
		          }else{
		            //showAlertBox('Please try again' , error.data);
		          }
		      })
  		}

  $scope.getAllRates();
});