angular.module('app.projectX')
  .controller('bookingCtrl', function($scope, $http, $state, store, jwtHelper, projectApi, formlyConfig, $cordovaDatePicker, $window, $ionicPlatform){
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

		//store.set('jwt', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5ODc2NTQzMjEwIiwidXNlcklkIjoiMTIzNDU2In0.Cqf2T8UiDdX0m4oMqgNJhqWpWYfwwQ6cjmoqeBAcIKM");

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

	  //$scope.jwt = store.get('jwt');
  	//$scope.decodedJwt = $scope.jwt && jwtHelper.decodeToken($scope.jwt);

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
    
    if (!$window.navigator.userAgent.match(/(iPhone|iPod|iPad|Android)/i)) {
    $window.datePicker = {
        show: function(options, callback) { callback(new Date());}
    };
}
     // ONLY SUBMIT IF I HAVE VALID DATA
  $scope.doSubmit = function() {
    alert(JSON.stringify($scope.formData, null, 2));
  }
 
  function createFormlyType() {
    formlyConfig.setType({
      name: 'inputDatePicker',
      templateUrl: 'inputDatePicker.html',
      defaultOptions: {}
    });
  }
 
  $scope.formData = {
    startDateTime : new Date()
  };
 
   createFormlyType()
 
  $scope.formFields = [{
    "type": "input",
    "key": "name",
    "templateOptions": {
      "type": "text",
      "placeholder": "Aaron Saunders",
      "icon": "ion-person",
      required: true,
      "iconPlaceholder": true
    }
  }, {
    "type": "input",
    "key": "email",
    "templateOptions": {
      "type": "email",
      "placeholder": "jane.doe@apple.com",
      "icon": "ion-email",
      required: true,
      "iconPlaceholder": true
    }
  }, {
    key: 'startDateTime',
    type: 'inputDatePicker',
    templateOptions: {
      dateFormat: 'medium',
      onclick: function($modelValue, $options) {
        var options = {
          date: new Date(),
          mode: 'datetime', // 'date' or 'time'
          minDate: new Date(),
          allowOldDates: false,
          allowFutureDates: true,
          doneButtonLabel: 'DONE',
          doneButtonColor: '#F2F3F4',
          cancelButtonLabel: 'CANCEL',
          cancelButtonColor: '#000000'
        };
       /* $cordovaDatePicker.show(options).then(function(date) {
          $modelValue[$options.key] = date;
        });*/

 $ionicPlatform.ready(function () {
            $cordovaDatePicker.show(options).then(function (date) {
                $modelValue[$options.key] = date;
            });
        });
      }
    }
  }, ]


  


});