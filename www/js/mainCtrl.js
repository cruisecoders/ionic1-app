angular.module('app.projectX').controller('mainCtrl',
['$scope', 'menuConstant', 'projectApi', '$rootScope', 'store', '$mdDialog', '$ionicPlatform','$state', 
'$ionicHistory', 'MIX_PANEL_EVENTS',
 function($scope, menuConstant, projectApi, $rootScope, store, $mdDialog, 
  $ionicPlatform , $state, $ionicHistory, MIX_PANEL_EVENTS){
	$scope.menuList = menuConstant.menuList;
	$scope.mainData = {};

	$scope.getCities = function(id, exp){

    $rootScope.callMixPanel(MIX_PANEL_EVENTS.citiesLoaded.key, MIX_PANEL_EVENTS.citiesLoaded.value);

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

        if($state.is('main.bookingDetail') || $state.is('confirmation')){
          $ionicHistory.goBack();    
        }else{
           $scope.showConfirm();
        }
        
      }, 100);

/*    $scope.getContactList = function() {

      var options = {};
       options.filter = "";
       options.multiple = true;

      $cordovaContacts.find(options).then(function(result) {
          $scope.contacts = result;
          console.log("fetching contacts ");
          console.log($scope.contacts);
      }, function(error) {
          console.log("ERROR: " + error);
      });
    }*/


    $scope.getCities();
//    $scope.getContactList();

}]);