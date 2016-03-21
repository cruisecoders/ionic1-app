angular.module('app.projectX')
  .controller('bookingCtrl', function($scope, $http, $state, store, jwtHelper, projectApi, 
    formlyConfig, $cordovaDatePicker, $window, $ionicPlatform, $ionicPopup, $location, $rootScope, errorMsgs){
	//$scope.validTokenObj = jwtHelper.decodeToken(store.get('jwt'));
 $scope.booking = {};
 $scope.booking.pickupDetail = {};
 $scope.booking.dropDetail = {};
 $scope.refData = {};

$scope.userInfo = store.get('userInfo');
$scope.booking.number = $scope.userInfo.number;

 $scope.submitBookingForm = function(){
     if(!$scope.isValidated()){
        return false;
     }
     $rootScope.showLoader();
     $scope.booking.userId = $scope.userInfo.id;
    projectApi.submitBookingForm($scope.booking).then(function(response){
      $rootScope.hideLoader();
      console.log("booking successful");
      store.set('bookingModel', response.data.data);
     //$location.path('confirmation');
      //$location.replace();
      $state.go('confirmation', {}, {reload: true});
    }, function(error){
      $rootScope.hideLoader();
      console.log("booking failed");
      if(error.data.errorMsg){
          $rootScope.showAlertBox('Please try again' , error.data.errorMsg);
        }else{
            //showAlertBox('Please try again' , error.data);
       }
    })
 }

 $scope.isValidated= function(){
    if(!$scope.booking.city || !$scope.booking.city.name){
      //Error Msg
      $rootScope.showAlertBox(errorMsgs.invalidForm , errorMsgs.cityIsEmpty);
      return false;
    }

    if($scope.booking.itemCount =="" || $scope.booking.itemCount == undefined || $scope.booking.itemCount==null){
      //Error Msg
      $rootScope.showAlertBox(errorMsgs.invalidForm , errorMsgs.itemCountIsEmpty);
      return false;
    }

    if($scope.booking.number =="" || $scope.booking.number == undefined || $scope.booking.number==null){
      //Error Msg
      $rootScope.showAlertBox(errorMsgs.invalidForm , errorMsgs.numberIsEmpty);
      return false;
    }

    if(!$scope.booking.pickupDetail.street || !$scope.booking.pickupDetail.street.name){
      //Error Msg
      $rootScope.showAlertBox(errorMsgs.invalidForm , errorMsgs.pickupStreetIsEmpty);
      return false;
    }

    if(!$scope.booking.pickupDetail.substreet || !$scope.booking.pickupDetail.substreet.name){
      //Error Msg
      $rootScope.showAlertBox(errorMsgs.invalidForm , errorMsgs.pickupSubStreetIsEmpty);
      return false;
    }
 
    if(!$scope.booking.dropDetail.street || !$scope.booking.dropDetail.street.name){
      //Error Msg
      $rootScope.showAlertBox(errorMsgs.invalidForm , errorMsgs.dropStreetIsEmpty);
      return false;
    }

    if(!$scope.booking.dropDetail.substreet || !$scope.booking.dropDetail.substreet.name){
      //Error Msg
      $rootScope.showAlertBox(errorMsgs.invalidForm , errorMsgs.dropSubStreetIsEmpty);
      return false;
    }

    if($scope.booking.pickupDetail.date =="" || $scope.booking.pickupDetail.date == undefined || $scope.booking.pickupDetail.date==null){
      //Error Msg
      $rootScope.showAlertBox(errorMsgs.invalidForm , errorMsgs.pickupDateIsEmpty);
      return false;
    }
    
    if($scope.booking.dropDetail.date =="" || $scope.booking.dropDetail.date == undefined || $scope.booking.dropDetail.date==null){
      //Error Msg
      $rootScope.showAlertBox(errorMsgs.invalidForm , errorMsgs.dropDateIsEmpty);
      return false;
    }

    return true;

 }
  
  $scope.getCities = function(id, exp){
    projectApi.getResource('cities', id, exp).then(function(response){
        console.log("Suuccess Handler");
        $scope.refData.cities = response.data;
      }, function(error){
        console.log("Failure Handler");
         if(error.data.errorMsg){
             $rootScope.showAlertBox('Please try again' , error.data.errorMsg);
          }else{
            //showAlertBox('Please try again' , error.data);
          }
      })
  }

  $scope.getStreets = function(cityId, exp){
    $rootScope.showLoader();
    $scope.booking.pickupDetail.street = undefined;
    $scope.booking.dropDetail.street = undefined;
    projectApi.getResource('streets', cityId, exp).then(function(response){
        $rootScope.hideLoader();
        console.log("Suuccess Handler");
        $scope.refData.streets = response.data;
      }, function(error){
        $rootScope.hideLoader();
        console.log("Failure Handler");
         if(error.data.errorMsg){
             $rootScope.showAlertBox('Please try again' , error.data.errorMsg);
          }else{
            //showAlertBox('Please try again' , error.data);
          }
      })
  }

  $scope.getSubStreets = function(streetId, exp){
    projectApi.getResource('subStreets', streetId, exp).then(function(response){
        console.log("Suuccess Handler");
        $scope.refData.subStreets = response.data;
      }, function(error){
        console.log("Failure Handler");
         if(error.data.errorMsg){
             $rootScope.showAlertBox('Please try again' , error.data.errorMsg);
          }else{
            //showAlertBox('Please try again' , error.data);
          }
      })
  }

   // Date and Time Picker Start
  if (!$window.navigator.userAgent.match(/(iPhone|iPod|iPad|Android)/i)) {
      $window.datePicker = {
          show: function(options, callback) { callback(new Date());}
      };
  }
     // ONLY SUBMIT IF I HAVE VALID DATA
  $scope.doSubmit = function() {
    alert(JSON.stringify($scope.formData, null, 2));
  }
 
  function createFormlyType() {
    formlyConfig.setType({
      name: 'inputDatePicker',
      templateUrl: 'inputDatePicker.html',
      defaultOptions: {}
    });
  }
 
  $scope.pickupFormData = {
    //startDateTime : new Date()
  };
 
  $scope.dropFormData = {
    //startDateTime : new Date()
  };

  $scope.booking.pickupDetail.date = $scope.pickupFormData.startDateTime;
  $scope.booking.dropDetail.date = $scope.dropFormData.startDateTime;

  var minDate = ionic.Platform.isIOS() ? new Date() : (new Date()).valueOf();


  $scope.pickupFormFields = [{
    key: 'startDateTime',
    type: 'inputDatePicker',
    templateOptions: {
      dateFormat: 'medium',
      onclick: function($modelValue, $options) {
        var options = {
          date: new Date(),
          mode: 'datetime', // 'date' or 'time'
          minDate: minDate,
          allowOldDates: false,
          allowFutureDates: true,
          doneButtonLabel: 'DONE',
          doneButtonColor: '#F2F3F4',
          cancelButtonLabel: 'CANCEL',
          cancelButtonColor: '#000000'
        };
      $ionicPlatform.ready(function () {
            $cordovaDatePicker.show(options).then(function (date) {
                $modelValue[$options.key] = date;
                $scope.booking.pickupDetail.date = date;
            });
        });
        }
      }
  }];

  $scope.dropFormFields = [{
    key: 'startDateTime',
    type: 'inputDatePicker',
    templateOptions: {
      dateFormat: 'medium',
      onclick: function($modelValue, $options) {
        var options = {
          date: new Date(),
          mode: 'datetime', // 'date' or 'time'
          minDate: minDate,
          allowOldDates: false,
          allowFutureDates: true,
          doneButtonLabel: 'DONE',
          doneButtonColor: '#F2F3F4',
          cancelButtonLabel: 'CANCEL',
          cancelButtonColor: '#000000'
        };
      $ionicPlatform.ready(function () {
            $cordovaDatePicker.show(options).then(function (date) {
                $modelValue[$options.key] = date;
                $scope.booking.dropDetail.date = date;
            });
        });
        }
      }
  }];

  // Date and Time Picker End

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

  $scope.showEstimatePopup = function(){
    $scope.genericPopup('Estimated Cost','Estimated Cost', 'estimate.html');
  }

  $scope.showCityPopUP = function(){
    $scope.genericPopup('Select City','Select City', 'city.html');
  };

  $scope.showPickupStreetPopUP = function(){

    if(!$scope.booking.city || !$scope.booking.city.name){
      //Error Msg
      $rootScope.showAlertBox(errorMsgs.invalidSelection , errorMsgs.selectCityFirst);
      return false;
    }
    $scope.genericPopup('Select Street/Landmark','Select City', 'pickupStreet.html');
  };

   $scope.showDropStreetPopUP = function(){
    if(!$scope.booking.city || !$scope.booking.city.name){
      //Error Msg
      $rootScope.showAlertBox(errorMsgs.invalidSelection , errorMsgs.selectCityFirst);
      return false;
    }
    $scope.genericPopup('Select Street/Landmark','Select City', 'dropStreet.html');
  };

  createFormlyType();
  $scope.getCities();

});