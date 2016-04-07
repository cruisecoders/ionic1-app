angular.module('app.projectX').controller('appCtrl', [ 
  '$scope', '$ionicPopup', 'loginService', '$state', 'store', 'AUTH_EVENTS', '$rootScope',
  function($scope, $ionicPopup, loginService, $state, store, AUTH_EVENTS, $rootScope){
  $scope.app = {};
  $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {

  	loginService.destroyUserCredentials();

  	store.remove('jwt');
    store.remove('userInfo');
    store.remove('cities');

  	$state.go('login.form', {}, {reload : true});

    var alertPopup = $ionicPopup.alert({
      title: 'Unauthorized!',
      template: 'You are not allowed to access this resource.'
    });
  });

  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    
    loginService.destroyUserCredentials();

  	store.remove('jwt');
    store.remove('userInfo');
    store.remove('cities');
    
    $state.go('login.form', {}, {reload : true});
    
    var alertPopup = $ionicPopup.alert({
      title: 'Message!',
      template: 'Please Login again.'
    });
  });

  

  $scope.$on(AUTH_EVENTS.httpNotFound, function(event) {

    var alertPopup = $ionicPopup.alert({
      title: 'I am Sorry!',
      template: 'Service not found. Please call customer care!'
    });
  });

  $scope.app.userCredentials = loginService.loadUserCredentials();

  if(!$scope.app.userCredentials){
    $scope.app.userCredentials = store.get('userInfo');
  }else{
    if($scope.app.userCredentials.id == "" || $scope.app.userCredentials.id == null || $scope.app.userCredentials.id == undefined){
      $scope.app.userCredentials = store.get('userInfo');
    }
  }


  $scope.logout = function(){
    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated, "Logout done");
  }


}]);