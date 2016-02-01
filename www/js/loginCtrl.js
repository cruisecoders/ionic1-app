angular.module('app.projectX').controller('loginCtrl', function($scope, loginService, $state, store){
	
  $scope.user = {};

  $scope.login = function() {
    	
    	loginService.login($scope.user).then(
    		function(response){
           if(response.data.isExist){
            $state.go('login.otp');
           }else{
            $state.go('login.signUp');
           }
    		},function(error){
          console.log("Login failed");
          //TODO Ionic Alert
    		});
  }

  $scope.submitOTP = function() {
      
      loginService.submitOTP($scope.user).then(
        function(response){
          console.log("OTP Done");
          store.set('jwt', response.data.user.jwt);
          loginService.storeUserCredentials(response.data.user);
          loginService.storeToken(response.data.user.jwt);
          $state.go('main.booking', {}, {reload: true});
        },function(error){
          console.log("OTP failed");
          //TODO ionic alert
        });
  }

})

.service('loginService', function ($http, $q, CONTEXT_URL) {

  var userCredentials = {};
  var isAuthenticated = false;
  var authToken;

  function loadUserCredentials() {
    return userCredentials;
  }

  function isAuthorized() {
    return isAuthenticated;
  }

  function loadToken() {
    return authToken;
  }

  function storeUserCredentials(user) {
    userCredentials.userId = user.userId;
    userCredentials.username = user.username; 
    userCredentials.number= user.number;
  }

  function storeToken(token) {
    authToken = token;
    isAuthenticated = true;
  }

  function destroyUserCredentials() {
    userCredentials = {};
    authToken = undefined;
    isAuthenticated = false;
  }

  var login = function(user) {
      return $http.get(CONTEXT_URL.url + "login", {
            params : {
              number : user.number
            }
          });
    }

  var submitOTP = function(user) {
      return $http.post(CONTEXT_URL.url + "submitOtp", user , {});
    }

  var logout = function() {
  };

  return {
    login: login,
    submitOTP : submitOTP,
    logout: logout,
    isAuthorized: isAuthorized,
    loadUserCredentials : loadUserCredentials,
    loadToken : loadToken,
    storeUserCredentials : storeUserCredentials,
    storeToken : storeToken,
    destroyUserCredentials : destroyUserCredentials
  };

});