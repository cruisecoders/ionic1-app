angular.module('app.projectX').controller('pricingCtrl',['$rootScope', 'projectApi', '$scope', function($rootScope, projectApi, $scope){
		$scope.refData = {};	

		$scope.getAllRates = function(id, exp){
		    projectApi.getResource('getAllRates', id, exp).then(function(response){
		        console.log("Suuccess Handler");
		        $scope.refData.rates = response.data;
		      }, function(error){
		        console.log("Failure Handler");
		         if(error.data !=undefined && error.data.errorMsg !=undefined){
		             $rootScope.showAlert('Please try again' , error.data.errorMsg);
		          }else{
		            //showAlertBox('Please try again' , error.data);
		          }
		      })
  		}

  $scope.getAllRates();
}]);