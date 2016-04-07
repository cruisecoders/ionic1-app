angular.module('app.projectX').controller('loginCtrl',
['$scope', 'loginService', '$state', 'store', '$ionicPopup', '$rootScope',
 function($scope, loginService, $state, store, $ionicPopup, $rootScope){
	
  $scope.user = {};

  $scope.login = function() {
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
          $rootScope.showAlertBox('Please try again' , error.data.errorMsg);
        }else{
          $rootScope.showAlertBox('Please try again' , error);
        }
    		});
  }

  $scope.submitOTP = function() {
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
               $rootScope.showAlertBox('Please try again' , error.data.errorMsg);
            }else{
              $rootScope.showAlertBox('Please try again' , error);
            }
           
        });
  }

  $scope.regenerateOTP = function() {
      $rootScope.showLoader();
      loginService.regenerateOTP($scope.user).then(
        function(response){
           $rootScope.hideLoader();
        },function(error){
          $rootScope.hideLoader();
          console.log("OTP generation failed");
         //$scope.error = error.data.data;
         if(error.data !=undefined && error.data.errorMsg !=undefined){
            $rootScope.showAlertBox('Please try again' , error.data.errorMsg);
          }else{
            $rootScope.showAlertBox('Please try again' , error);
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