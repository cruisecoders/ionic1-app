angular.module('app.projectX').controller('confirmationCtrl', function($scope, store){
	
	$scope.bookingModel = store.get("bookingModel");

	store.remove('bookingModel');
});