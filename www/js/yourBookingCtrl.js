angular.module('app.projectX').controller('yourBookingCtrl', ['$scope', 'store', 'projectApi', 
	'$state', '$rootScope', 'MIX_PANEL_EVENTS',
	function($scope, store, projectApi, $state  ,$rootScope, MIX_PANEL_EVENTS){
	
	$scope.yourBooking = {};

	$scope.userInfo = store.get('userInfo');

	$scope.getBookingsByUserId = function(userId, exp){
		$rootScope.callMixPanel(MIX_PANEL_EVENTS.bookingsLoaded.key, MIX_PANEL_EVENTS.bookingsLoaded.value);
		$rootScope.showLoader();
		projectApi.getResource('getBookings', userId, exp).then(function(response){
			$rootScope.hideLoader();
	        console.log("Suuccess Handler");
	        $scope.yourBooking.List = response.data;
	        $scope.$broadcast('scroll.refreshComplete');
	      }, function(error){
	      	 $rootScope.hideLoader();
	         console.log("Failure Handler");
	         if(error.data !=undefined && error.data.errorMsg !=undefined){
	             $rootScope.showAlert('Please try again' , error.data.errorMsg);
	          }else{
	            //showAlertBox('Please try again' , error.data);
	          }
	      })
	}

	$scope.selectBooking =  function(bookingObj){
		$scope.mainData.selectedBooking = bookingObj;
		$state.go('main.bookingDetail');
	}

	$scope.getBookingsByUserId($scope.userInfo.id);

}]);