angular.module('app.projectX')
  .controller('bookingCtrl', function($scope, $http, $state, store, jwtHelper, projectApi){
	     
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
	

});