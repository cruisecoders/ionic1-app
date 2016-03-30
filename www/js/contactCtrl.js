angular.module('app.projectX').controller('contactCtrl', [ '$timeout','ionicMaterialMotion', 'ionicMaterialInk',
	 function($timeout, ionicMaterialMotion, ionicMaterialInk) {
		
    	$timeout(function () {
            ionicMaterialMotion.ripple();
            ionicMaterialInk.displayEffect();
        });

}]);