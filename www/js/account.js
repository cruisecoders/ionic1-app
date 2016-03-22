angular.module('app.projectX').controller('accountCtrl', [ '$scope', 'projectApi', 'store' ,function($scope, projectApi, store){
	$scope.profile = {};

	$scope.userInfo = store.get('userInfo');
}])