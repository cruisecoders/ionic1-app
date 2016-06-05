angular.module('app.projectX')
  .controller('estimateCtrl',[

    '$scope', '$http', 'store', 'projectApi', '$rootScope', 'errorMsgs', '$ionicPopup',

  function($scope, $http, store, projectApi, $rootScope, errorMsgs, $ionicPopup){
	
  $scope.refData = {};
  $scope.estimate = {};

  $scope.estimate.zeroToFif = 0;
  $scope.estimate.fitToThirty = 0;
  $scope.estimate.aboveThirty = 0;
  $scope.extraLuggageCount = 0;
  $scope.extraLuggageCountCharges = 0;
  $scope.estimate.numberOfLuggages = 0;

  $scope.extraKgCount = 0;
  $scope.extraKgCountCharges = 0;

   $scope.refData.cities = store.get("cities");

   $scope.getPrice = function(cityId, exp){
    $rootScope.showLoader();
    projectApi.getResource('getRates', cityId, exp).then(function(response){
        $rootScope.hideLoader();
        console.log("Suuccess Handler");
        $scope.refData.rate = response.data;
      }, function(error){
        $rootScope.hideLoader();
        console.log("Failure Handler");
         if(error.data !=undefined && error.data.errorMsg !=undefined){
             $rootScope.showAlert('Please try again' , error.data.errorMsg);
          }else{
            //showAlertBox('Please try again' , error.data);
          }
      })
  }

  $scope.getApproximateRate = function(){
    if($scope.refData.rate){
      var total = 0;
      total += $scope.estimate.zeroToFif * $scope.refData.rate.zeroToFifCount;
      total += $scope.estimate.fitToThirty * $scope.refData.rate.fifToThirCount;
      total += $scope.estimate.aboveThirty * $scope.refData.rate.aboveThirty;

      return total;
    }

    return 0;
  }

  $scope.getExtraLuggage = function(){

    if($scope.refData.rate){

      $scope.extraLuggageCount = $scope.estimate.numberOfLuggages - $scope.refData.rate.luggageLimit;

      if($scope.extraLuggageCount > 0){
        return $scope.extraLuggageCount;
      }
    }

    $scope.extraLuggageCount = 0;

    return $scope.extraLuggageCount;
  }

  $scope.getExtraPerLuggage = function(){

    console.log("inside extra per luggage");

    if($scope.refData.rate){

      console.log("inside extra per luggage");

      $scope.extraLuggageCountCharges = $scope.extraLuggageCount * $scope.refData.rate.amountPerLuggage;

      console.log(" $scope.extraLuggageCountCharges "+ $scope.extraLuggageCountCharges);

      
      return $scope.extraLuggageCountCharges;

    }
    
    $scope.extraLuggageCountCharges = 0; 

    return $scope.extraLuggageCountCharges;
  }

  $scope.getExtraKg = function(){

    if($scope.refData.rate){

      $scope.extraKgCount = $scope.estimate.approxWeight - $scope.refData.rate.luggageLimitInKgs;

      if($scope.extraKgCount > 0){
        return $scope.extraKgCount;
      }
    }

    $scope.extraKgCount = 0;

    return $scope.extraKgCount;
  }

  $scope.getExtraPerKg = function(){

    if($scope.refData.rate){

      $scope.extraKgCountCharges = $scope.extraKgCount * $scope.refData.rate.amountPerKgs;
      
      return $scope.extraKgCountCharges;

    }
    
    $scope.extraKgCountCharges = 0; 

    return $scope.extraKgCountCharges; 
  }

  $scope.getApproximateTotalForCustomerBase = function(){

     if($scope.refData.rate && $scope.estimate.numberOfLuggages){

      return $scope.extraKgCountCharges + $scope.extraLuggageCountCharges + $scope.refData.rate.zeroToFifCount;
    }
  }



   var genericPopup;

   $scope.genericPopup = function(title, subTitle, templateURL) {
      //$scope.data = {}
    
      // Custom popup
      genericPopup = $ionicPopup.show({
         templateUrl: templateURL,
         title: title,
         cssClass : 'booking-popup',
        // subTitle: subTitle,
         scope: $scope,
      });

      genericPopup.then(function(res) {
         console.log('Tapped!', res);
      });    
   };

  $scope.closeGenericPopup = function(){
    genericPopup.close();
  };

  $scope.showCityPopUP = function(){
    $scope.genericPopup('Select City','Select City', 'city.html');
  };
  
}]);