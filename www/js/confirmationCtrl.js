angular.module('app.projectX').controller('confirmationCtrl', [ '$scope', 'store' ,function($scope, store){
	
	$scope.bookingModel = store.get("bookingModel");

	store.remove('bookingModel');
}]);