angular.module('app.projectX').controller('appCtrl', [ 
  '$scope', 'loginService', '$state', 'store', 'AUTH_EVENTS', '$rootScope',
  function($scope, loginService, $state, store, AUTH_EVENTS, $rootScope){
  $scope.app = {};
  $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {

  	loginService.destroyUserCredentials();

  	store.remove('jwt');
    store.remove('userInfo');
    store.remove('cities');

  	$state.go('login.form', {}, {reload : true});

    $rootScope.showAlert('Unauthorized!', 'You are not allowed to access this resource.');
  });

  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    
    loginService.destroyUserCredentials();

  	store.remove('jwt');
    store.remove('userInfo');
    store.remove('cities');
    
    $state.go('login.form', {}, {reload : true});

    $rootScope.showAlert('Message!', 'Please Login again.');
    
  });

  

  $scope.$on(AUTH_EVENTS.httpNotFound, function(event) {

    $rootScope.showAlert('I am Sorry !!!', 'Service not found. Please call customer care.');

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