angular.module('app.projectX').controller('mainCtrl',
['$scope', 'menuConstant', 'projectApi', '$rootScope', 'store', '$mdDialog', '$ionicPlatform','$state', '$ionicHistory',
 function($scope, menuConstant, projectApi, $rootScope, store, $mdDialog, $ionicPlatform , $state, $ionicHistory){
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

   $scope.showConfirm = function() {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
              .title('Would you like to close ?')
              .textContent('')
              .ariaLabel('Lucky day')
              //.targetEvent(ev)
              .ok('Yes')
              .cancel('No');
        $mdDialog.show(confirm).then(function() {
          //$scope.status = 'You decided to get rid of your debt.';
          ionic.Platform.exitApp();
        }, function() {
          //$scope.status = 'You decided to keep your debt.';
        });
      };
      
      $ionicPlatform.registerBackButtonAction(function() {

        if($state.is('main.booking')){
          $scope.showConfirm();
        }else{
          $ionicHistory.goBack();
        }
        
      }, 100);
}]);