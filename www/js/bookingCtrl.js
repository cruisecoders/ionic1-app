angular.module('app.projectX')
  .controller('bookingCtrl', function($scope, $http, $state, store, jwtHelper, projectApi, 
    formlyConfig, $cordovaDatePicker, $window, $ionicPlatform, $ionicPopup, $location){
	//$scope.validTokenObj = jwtHelper.decodeToken(store.get('jwt'));
 $scope.booking = {};
 $scope.booking.pickupDetail = {};
 $scope.booking.dropDetail = {};
 $scope.refData = {};

 $scope.submitBookingForm = function(){
    projectApi.submitBookingForm($scope.booking).then(function(response){
      console.log("booking successful");
      store.set('bookingModel', response.data.data);
      $location.path('confirmation');
      $location.replace();
      //$state.go('confirmation', {}, {reload: true});
    }, function(error){
      console.log("booking failed");
    })
 }
  
  $scope.getCities = function(id, exp){
    projectApi.getResource('cities', id, exp).then(function(response){
        console.log("Suuccess Handler");
        $scope.refData.cities = response.data;
      }, function(error){
        console.log("Failure Handler");
         if(error.data.errorMsg){
             showAlertBox('Please try again' , error.data.errorMsg);
          }else{
            //showAlertBox('Please try again' , error.data);
          }
      })
  }

  $scope.getStreets = function(cityId, exp){
    projectApi.getResource('streets', cityId, exp).then(function(response){
        console.log("Suuccess Handler");
        $scope.refData.streets = response.data;
      }, function(error){
        console.log("Failure Handler");
         if(error.data.errorMsg){
             showAlertBox('Please try again' , error.data.errorMsg);
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
             showAlertBox('Please try again' , error.data.errorMsg);
          }else{
            //showAlertBox('Please try again' , error.data);
          }
      })
  }

  function showAlertBox(title, msg){
    var alertPopup = $ionicPopup.alert({
       title: title,
       template: msg
     });
     alertPopup.then(function(res) {
       console.log('Please try again later ');
     });
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
    startDateTime : new Date()
  };
 
  $scope.dropFormData = {
    startDateTime : new Date()
  };

  $scope.pickupFormFields = [{
    key: 'startDateTime',
    type: 'inputDatePicker',
    templateOptions: {
      dateFormat: 'medium',
      onclick: function($modelValue, $options) {
        var options = {
          date: new Date(),
          mode: 'datetime', // 'date' or 'time'
          minDate: new Date(),
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
          minDate: new Date(),
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

  $scope.showPickupStreetPopUP = function(){
    $scope.genericPopup('Select Street/Landmark','Select City', 'pickupStreet.html');
  };

   $scope.showDropStreetPopUP = function(){
    $scope.genericPopup('Select Street/Landmark','Select City', 'dropStreet.html');
  };

  createFormlyType();
  $scope.getCities();

});