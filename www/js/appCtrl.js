angular.module('app.projectX').controller('appCtrl', function($scope, $ionicPopup, loginService, $state, store, AUTH_EVENTS){
	

  $scope.app = {};


  $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {

  	loginService.destroyUserCredentials();

  	store.remove('jwt');

  	$state.go('login.form', {}, {reload : true});

    var alertPopup = $ionicPopup.alert({
      title: 'Unauthorized!',
      template: 'You are not allowed to access this resource.'
    });
  });

  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    
    loginService.destroyUserCredentials();

  	store.remove('jwt');
    
    $state.go('login.form', {}, {reload : true});
    
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  });

  $scope.app.userCredentials = loginService.loadUserCredentials();

});