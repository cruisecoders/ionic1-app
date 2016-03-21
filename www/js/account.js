angular.module('app.projectX').controller('accountCtrl', function($scope, projectApi, store){
	$scope.profile = {};

	$scope.userInfo = store.get('userInfo');
})