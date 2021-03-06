angular.module('app.projectX').controller('loginCtrl',
['$scope', 'loginService', '$state', 'store', '$ionicPopup', '$rootScope', 'MIX_PANEL_EVENTS',
 function($scope, loginService, $state, store, $ionicPopup, $rootScope, MIX_PANEL_EVENTS){

  //mixpanel.track("Login Test called 4");
	
  $scope.user = {};

  $scope.loginShowHints = true;

  $scope.login = function() {
      //mixpanel.track("Login event called 4");
      $rootScope.callMixPanel(MIX_PANEL_EVENTS.loginForm.key,
       {"Attempt to Login " : "Attempt to login by " + $scope.user.number});
      
    	$rootScope.showLoader();
    	loginService.login($scope.user).then(
    		function(response){
           $rootScope.hideLoader();
           $scope.user = response.data.data;
           console.log("Inside success login");
           if($scope.user.numberExist == true || $scope.user.numberExist == "true"){
            $state.go('login.otp');
           }else{
            $state.go('login.signUp');
           }
    		},function(error){
          $rootScope.hideLoader();
          console.log("Login failed");
         //$scope.error = error.data.data;
         if(error.data !=undefined && error.data.errorMsg !=undefined){
          $rootScope.showAlert('Please try again' , error.data.errorMsg);
        }else{
          //$rootScope.showAlert('Please try again' , error);
        }
    		});
  }

  $scope.submitOTP = function() {
    $rootScope.callMixPanel(MIX_PANEL_EVENTS.submitOTP.key,
     {"Submit OTP" : "Submit OTP by " + $scope.user.number});
      $rootScope.showLoader();
      loginService.submitOTP($scope.user).then(
        function(response){
          $rootScope.hideLoader();
          console.log("OTP Done");
          store.set('jwt', response.data.data.token);
          store.set('userInfo', response.data.data.userInfo);
          loginService.storeUserCredentials(response.data.data.userInfo);
          loginService.storeToken(response.data.data.token);
          $state.go('main.booking', {}, {reload: true});
        },function(error){
          $rootScope.hideLoader();
          console.log("OTP failed");
           //$scope.error = error.data.data;
          
           if(error.data !=undefined && error.data.errorMsg !=undefined){
               $rootScope.showAlert('Please try again' , error.data.errorMsg);
            }else{
              //$rootScope.showAlert('Please try again' , error);
            }
           
        });
  }

  $scope.regenerateOTP = function() {
    $rootScope.callMixPanel(MIX_PANEL_EVENTS.regenrateOTP.key,
     {"Regenrate OTP" : "Regenrate OTP by " + $scope.user.number});
      $rootScope.showLoader();
      loginService.regenerateOTP($scope.user).then(
        function(response){
           $rootScope.hideLoader();
        },function(error){
          $rootScope.hideLoader();
          console.log("OTP generation failed");
         //$scope.error = error.data.data;
         if(error.data !=undefined && error.data.errorMsg !=undefined){
            $rootScope.showAlert('Please try again' , error.data.errorMsg);
          }else{
            //$rootScope.showAlert('Please try again' , error);
          }
        });
  }

}])

.service('loginService', [ '$http', '$q', 'EnvironmentConfig', function ($http, $q, EnvironmentConfig) {

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
    userCredentials = user;
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
      return $http.get(EnvironmentConfig.api + "login", {
            params : {
              number : user.number
            }
          });
    }

    

  var regenerateOTP = function(user) {
      return $http.get(EnvironmentConfig.api + "regenerateOTP", {
            params : {
              number : user.number
            }
          });
    }

  var submitOTP = function(user) {
      return $http.post(EnvironmentConfig.api + "submitOtp", user , {});
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
    destroyUserCredentials : destroyUserCredentials,
    regenerateOTP : regenerateOTP
  };

}]);