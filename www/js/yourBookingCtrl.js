angular.module('app.projectX').controller('yourBookingCtrl', function($scope, store, projectApi, $state,$rootScope){
	
	$scope.yourBooking = {};

	$scope.getBookingsByUserId = function(userId, exp){
		$rootScope.showLoader();
		projectApi.getResource('getBookings', userId, exp).then(function(response){
			$rootScope.hideLoader();
	        console.log("Suuccess Handler");
	        $scope.yourBooking.List = response.data;
	        $scope.$broadcast('scroll.refreshComplete');
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

	$scope.selectBooking =  function(bookingObj){
		$scope.mainData.selectedBooking = bookingObj;
		$state.go('main.bookingDetail');
	}

	$scope.getBookingsByUserId($scope.app.userCredentials.id);

});