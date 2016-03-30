angular.module('app.projectX').controller('accountCtrl', [ '$scope','$timeout', 'projectApi', 'store', 
	'ionicMaterialMotion', 'ionicMaterialInk', function($scope,$timeout, projectApi, store, ionicMaterialMotion, ionicMaterialInk){
	$scope.profile = {};

	$scope.userInfo = store.get('userInfo');

	// Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);
    
    // Set Ink
    ionicMaterialInk.displayEffect();

}])