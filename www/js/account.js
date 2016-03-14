angular.module('app.projectX').controller('accountCtrl', function($scope, projectApi){
	$scope.profile = {};
	$scope.getUserProfile =  function(){
		projectApi.getResource('profile', $scope.app.userCredentials.userId).then(function(response){
        console.log("Suuccess Handler");
        $scope.profile.user = response.data;
      }, function(error){
        console.log("Failure Handler");
      });
	}
	$scope.getUserProfile();	
})