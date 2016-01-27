angular.module('app.projectX').controller('loginCtrl', function($scope, loginService, $state, store){
	
  $scope.user = {};

  $scope.login = function() {
    	
    	loginService.login($scope.user).then(
    		function(response){
          console.log("Login done");
           $state.go('login.otp');
    		},function(error){
          console.log("Login failed");
    		});
  }

  $scope.submitOTP = function() {
      
      loginService.submitOTP($scope.user).then(
        function(response){
          console.log("OTP Done");
          store.set('jwt', response.data.data);
          $state.go('main.booking');
        },function(error){
          console.log("OTP failed");
        });
  }

})

.service('loginService', function ($http, $q) {

  var username = '';
  var isAuthenticated = false;
  var authToken;

  function loadUserCredentials() {
  }

  function storeUserCredentials(token) {}

  function useCredentials(token) {}

  function destroyUserCredentials() {}

  var login = function(user) {
    return $http.get("http://localhost:8080/web-service/api/login", {
            params : {
              number : user.number
            }
          });
    }

  var submitOTP = function(user) {
    return $http.get("http://localhost:8080/web-service/api/submitOtp", {
            params : {
              otp : user.otp
            }
          });
    }

  var logout = function() {
  };

  var isAuthorized = function(authorizedRoles) {};

  loadUserCredentials();

  return {
    login: login,
    submitOTP : submitOTP,
    logout: logout,
    isAuthorized: isAuthorized,
    isAuthenticated: function() {return isAuthenticated;},
    username: function() {return username;}
  };

});