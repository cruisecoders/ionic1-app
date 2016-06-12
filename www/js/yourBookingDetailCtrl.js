angular.module('app.projectX').controller('yourBookingDetailCtrl', ['$scope', 'store', 'projectApi', 
	'$state', '$rootScope','$timeout','ionicMaterialMotion', 'ionicMaterialInk', 'MIX_PANEL_EVENTS',
	function($scope, store, projectApi, $state  ,$rootScope,$timeout, ionicMaterialMotion, ionicMaterialInk, MIX_PANEL_EVENTS){

	$scope.ref = {};

	$scope.ref.statusList = [{
		id:0,
		status : "NA",
		display : "Processing",
		isVisible : false,
		isUp : false
	},{
		id:1,
		status : "pick up assigned",
		display : "Pickup Assigned",
		isVisible : false,
		isUp : true
	},{
		id:2,
		status : "pick up done",
		display : "Pickup Done",
		isVisible : false,
		isUp : false
	},{
		id:3,
		status : "drop assigned",
		display : "Drop Assigned",
		isVisible : false,
		isUp : true
	},{
		id:4,
		status : "drop done",
		display : "Drop Done",
		isVisible : false,
		isUp : false
	}];

	var isStatusVisible = false;

	for(var i=1; i<=$scope.ref.statusList.length ; i++){

	  if($scope.mainData.selectedBooking.bookingStatus.status == $scope.ref.statusList[$scope.ref.statusList.length-i].status){
	  	isStatusVisible = true;
	  }

	  if(isStatusVisible){
	  	$scope.ref.statusList[$scope.ref.statusList.length-i].isVisible = true;
	  }

	}

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
	         if(error.data !=undefined && error.data.errorMsg !=undefined){
	             $rootScope.showAlert('Please try again' , error.data.errorMsg);
	          }else{
	            //showAlertBox('Please try again' , error.data);
	          }
	      })
	}

	$scope.cancelBooking = function(){
		$rootScope.callMixPanel(MIX_PANEL_EVENTS.bookingCancel.key, MIX_PANEL_EVENTS.bookingCancel.value + $scope.mainData.selectedBooking.number);
        $rootScope.showLoader();
          
        projectApi.cancelBooking($scope.mainData.selectedBooking.id).then(function(response){
            $rootScope.hideLoader();
            console.log("booking Cancel successful");
            $scope.mainData.selectedBooking = response.data.data;
        }, function(error){
            $rootScope.hideLoader();
            console.log("booking cancel failed");
            if(error.data !=undefined && error.data.errorMsg !=undefined){
                $rootScope.showAlert('Please try again' , error.data.errorMsg);
              }else{
                  //showAlertBox('Please try again' , error.data);
             }
        })
    }

    $scope.showCancelBookingButton =  function(){
    	if($scope.mainData.selectedBooking.bookingStatus.status == 'NA'){
    		return true;
    	}
    	if($scope.mainData.selectedBooking.bookingStatus.status == 'pick up assigned'){
    		return true;
    	}
    	return false;
    }

    $scope.getWeightList =  function(){
    	if($scope.mainData.selectedBooking && $scope.mainData.selectedBooking.luggageInfo && $scope.mainData.selectedBooking.luggageInfo.luggageWeights){
    		var arrString = new Array();
        	arrString = $scope.mainData.selectedBooking.luggageInfo.luggageWeights.split(',');
        	return arrString;
    	}
    	return [];
    }


	$scope.getPickupAndDropUserInfo($scope.mainData.selectedBooking.id);

	$timeout(function () {
        ionicMaterialMotion.fadeSlideInRight();
        ionicMaterialInk.displayEffect();
    });

        //$scope.boxClass = true;
}]);