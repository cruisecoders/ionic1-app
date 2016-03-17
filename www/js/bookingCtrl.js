angular.module('app.projectX')
  .controller('bookingCtrl', function($scope, $http, $state, store, jwtHelper, projectApi, 
    formlyConfig, $cordovaDatePicker, $window, $ionicPlatform, $ionicPopup){
	//$scope.validTokenObj = jwtHelper.decodeToken(store.get('jwt'));
 $scope.booking = {};
 $scope.refData = {};
  
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
 
  $scope.formData = {
    startDateTime : new Date()
  };
 
  $scope.formFields = [{
    "type": "input",
    "key": "name",
    "templateOptions": {
      "type": "text",
      "placeholder": "Aaron Saunders",
      "icon": "ion-person",
      required: true,
      "iconPlaceholder": true
    }
  }, {
    "type": "input",
    "key": "email",
    "templateOptions": {
      "type": "email",
      "placeholder": "jane.doe@apple.com",
      "icon": "ion-email",
      required: true,
      "iconPlaceholder": true
    }
  }, {
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
       /* $cordovaDatePicker.show(options).then(function(date) {
          $modelValue[$options.key] = date;
        });*/

      /*document.addEventListener("deviceready", function () {

          $cordovaDatePicker.show(options).then(function(date){
              $modelValue[$options.key] = date;
          });

        }, false);*/

 $ionicPlatform.ready(function () {
            $cordovaDatePicker.show(options).then(function (date) {
                $modelValue[$options.key] = date;
            });
        });
      }
    }
  }];

  // Date and Time Picker End


  createFormlyType();
  $scope.getCities();

});