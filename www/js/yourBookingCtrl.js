angular.module('app.projectX').controller('yourBookingCtrl', function($scope, store, projectApi, $state){
	
	$scope.yourBooking = {};

	$scope.getBookingsByUserId = function(userId, exp){
		projectApi.getResource('getBookings', userId, exp).then(function(response){
	        console.log("Suuccess Handler");
	        $scope.yourBooking.List = response.data;
	        $scope.$broadcast('scroll.refreshComplete');
	      }, function(error){
	        console.log("Failure Handler");
	         if(error.data.errorMsg){
	             showAlertBox('Please try again' , error.data.errorMsg);
	          }else{
	            //showAlertBox('Please try again' , error.data);
	          }
	      })
	}

	$scope.selectBooking =  function(bookingObj){
		$scope.mainData.selectedBooking = bookingObj;
		$state.go('main.bookingDetail');
	}

	function showAlertBox(title, msg){
	    var alertPopup = $ionicPopup.alert({
	       title: title,
	       template: msg
	     });
	     alertPopup.then(function(res) {
	       console.log('Please try again later ');
	     });
	  }

	  $scope.getBookingsByUserId($scope.app.userCredentials.id);

});