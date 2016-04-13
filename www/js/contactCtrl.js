angular.module('app.projectX').controller('contactCtrl', [ '$timeout','ionicMaterialMotion', 
	'ionicMaterialInk', '$scope', '$rootScope', 'projectApi',
	 function($timeout, ionicMaterialMotion, ionicMaterialInk, $scope, $rootScope, projectApi) {

	$scope.refData = {};

	$scope.getAllContacts = function(id, exp){
	    projectApi.getResource('getContactUs', id, exp).then(function(response){
	        console.log("Suuccess Handler");
	        $scope.refData.contacts = response.data;
	      }, function(error){
	        console.log("Failure Handler");
	         if(error.data !=undefined && error.data.errorMsg !=undefined){
	             $rootScope.showAlert('Please try again' , error.data.errorMsg);
	          }else{
	            //showAlertBox('Please try again' , error.data);
	          }
	      })
  		}

  $scope.getAllContacts();
		
	$timeout(function () {
	    ionicMaterialMotion.ripple();
	    ionicMaterialInk.displayEffect();
	});

}]);