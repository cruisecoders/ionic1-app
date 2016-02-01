angular.module('app.projectX')
  .controller('bookingCtrl', function($scope, $http, $state, store, jwtHelper, projectApi){
	//$scope.validTokenObj = jwtHelper.decodeToken(store.get('jwt'));
	     
       $scope.model ="";
       $scope.clickValueModel = "";
       $scope.removeValueModel = "";

       $scope.getTestItems = function (query) {
        if (query) {
            return {
              items: [{
                id: "1",
                name: query + "1",
                view: "view:" + query + "1"
              },{
                id: "2",
                name: query + "2",
                view: "view" + query + "2"               
              },{
                id: "1",
                name: query + "2",
                view: "view"  + query + "3"
              }]
          };
       }
       return {items: []}; 
     };

     $scope.itemClicked = function (callback) {
        $scope.clickValueModel = callback;
     }
     $scope.itemRemoved = function (callback) {
        $scope.removeValueModel = callback;
     }

	$scope.testBooking = function(){

		store.set('jwt', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5ODc2NTQzMjEwIiwidXNlcklkIjoiMTIzNDU2In0.Cqf2T8UiDdX0m4oMqgNJhqWpWYfwwQ6cjmoqeBAcIKM");

		$http.get("http://localhost:8080/web-service/api/test", {
            params : {
              number : 9876543210
            }
          }).then(function(res){
          	$scope.testVar = res.data.data;
          	$state.go('main.booking', {}, {reload: true});
          }, function(err){
          	alert("authorization failed");
          });
	}

	  $scope.jwt = store.get('jwt');
  	$scope.decodedJwt = $scope.jwt && jwtHelper.decodeToken($scope.jwt);

    $scope.getPickUpStreets = function(exp){
      projectApi.getResource('pickUpStreets', id, exp).then(function(response){
        console.log("Suuccess Handler");
      }, function(error){
        console.log("Failure Handler");
      })
    }

    $scope.getDropStreets = function(exp){
      projectApi.getResource('dropStreets', id, exp).then(function(response){
        console.log("Suuccess Handler");
      }, function(error){
        console.log("Failure Handler");
      })
    }
	
    $scope.getCities = function(){
      projectApi.getResource('cities').then(function(response){
        console.log("Suuccess Handler");
      }, function(error){
        console.log("Failure Handler");
      })
    }

    $scope.booking = function(){
      
    }

	//$scope.testBooking();	
	
	$scope.timePickerObject12Hour = {
      inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
      step: 15,  //Optional
      format: 12,  //Optional
      titleLabel: '12-hour Format',  //Optional
      closeLabel: 'Close',  //Optional
      setLabel: 'Set',  //Optional
      setButtonType: 'button-positive',  //Optional
      closeButtonType: 'button-stable',  //Optional
      callback: function (val) {    //Mandatory
        
        $scope.timePickerObject12Hour.inputEpoch = val;

        if (typeof (val) === 'undefined') {
          console.log('Time not selected');
        } else {
          console.log($scope.timePickerObject12Hour.inputEpochTime);
          $scope.timePickerObject12Hour.inputEpochTime = val;
          console.log($scope.timePickerObject12Hour.inputEpochTime);
          $scope.epochVal = val;

          var selectedTime = new Date(val * 1000);
          console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');
        }
      }
    };

    function timePicker12Callback(val) {
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        $scope.timePickerObject12Hour.inputEpochTime = val;
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');
      }
	};
	
  $scope.onezoneDatepicker = {
    date: new Date(),
    
    callback: function(value){
      $scope.onezoneDatepicker.date = value;
     }
  };

  /*$scope.timePickerObject =  {
    inputEpochTime: ((new Date()).getHours() * 60 * 60),
    setLabel: 'Set',
    titleLabel: '12-hour Format',

  callback: function(val){
      timePickerCallback(val);
    }
  };*/

	/*function timePickerCallback(val) {
	  if (typeof (val) === 'undefined') {
		console.log('Time not selected');
	  } else {
		
		//$scope.timePickerObject.inputEpochTime = val;
		$scope.timePickerObject.inputEpochTime = val; 
		var selectedTime = new Date(val * 1000);
		console.log('Selected epoch is : ', val,
		 'and the time is ', selectedTime.getUTCHours(), ':',
		  selectedTime.getUTCMinutes(), 'in UTC');
	  }
	};*/
});