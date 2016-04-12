angular.module('app.projectX').controller('mainCtrl',
['$scope', 'menuConstant', 'projectApi', '$rootScope', 'store',
 function($scope, menuConstant, projectApi, $rootScope, store){
	$scope.menuList = menuConstant.menuList;
	$scope.mainData = {};

	$scope.getCities = function(id, exp){
    projectApi.getResource('cities', id, exp).then(function(response){
        console.log("Suuccess Handler");
        //$scope.refData.cities = response.data;
        store.set('cities', response.data);
      }, function(error){
        console.log("Failure Handler");
         if(error.data !=undefined && error.data.errorMsg !=undefined){
             $rootScope.showAlert('Please try again' , error.data.errorMsg);
          }else{
            //showAlertBox('Please try again' , error.data);
          }
      })
  }

  $scope.getCities();
}]);