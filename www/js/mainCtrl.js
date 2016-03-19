angular.module('app.projectX').controller('mainCtrl', function($scope, menuConstant){
	$scope.menuList = menuConstant.menuList;
	$scope.mainData = {};
});