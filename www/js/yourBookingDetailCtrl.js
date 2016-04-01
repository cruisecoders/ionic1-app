angular.module('app.projectX').controller('yourBookingDetailCtrl', ['$scope', 'store', 'projectApi', 
	'$state', '$rootScope',
	function($scope, store, projectApi, $state  ,$rootScope){

		$scope.getPickupAndDropUserInfo = function(bookingId, exp){
			$rootScope.showLoader();
			projectApi.getResource('getPickupAndDropUserInfo', bookingId, exp).then(function(response){
				$rootScope.hideLoader();
		        console.log("Suuccess Handler");
		       	$scope.pickupUserInfo = response.data.pickupUser;
		       	$scope.dropUserInfo = response.data.dropUser;
		      }, function(error){
		      	 $rootScope.hideLoader();
		         console.log("Failure Handler");
		         if(error.data.errorMsg){
		             $rootScope.showAlertBox('Please try again' , error.data.errorMsg);
		          }else{
		            //showAlertBox('Please try again' , error.data);
		          }
		      })
		}

		$scope.getPickupAndDropUserInfo($scope.mainData.selectedBooking.id);

}]);