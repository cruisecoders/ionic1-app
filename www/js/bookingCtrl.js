angular.module('app.projectX')
  .controller('bookingCtrl', 
    ['$scope', '$http', '$state', 'store', 'jwtHelper', 'projectApi', 
    '$cordovaDatePicker', '$window', '$ionicPlatform', '$ionicPopup', '$location', '$rootScope', 'errorMsgs',
    '$timeout' , '$mdSidenav' , '$log' , 'MIX_PANEL_EVENTS' ,
    function($scope, $http, $state, store, jwtHelper, projectApi, 
    $cordovaDatePicker, $window, $ionicPlatform, $ionicPopup, $location, $rootScope, errorMsgs, $timeout, $mdSidenav, $log, MIX_PANEL_EVENTS){
	//$scope.validTokenObj = jwtHelper.decodeToken(store.get('jwt'));
      
       $scope.booking = {};
       $scope.booking.pickupDetail = {};
       $scope.booking.dropDetail = {};
       $scope.refData = {};

       $scope.isDropDateDisabled = true;

       $scope.myDate = new Date();

      $scope.refData.pickupMinDate = new Date();

      $scope.refData.dropMinDate = new Date();

      $scope.refData.pickupMaxDate = new Date(
          $scope.myDate.getFullYear(),
          $scope.myDate.getMonth() + 2,
          $scope.myDate.getDate()
        );

      $scope.refData.dropMaxDate = new Date(
          $scope.myDate.getFullYear(),
          $scope.myDate.getMonth() + 3,
          $scope.myDate.getDate()
        );

      $scope.isDatePlaceholder = true;
      $scope.isDropDatePlaceholder = true;

      $scope.$watch('booking.pickupDetail.date', function(newValue, oldValue) {
        console.log("date changed ");
        console.log(newValue);
        if(newValue != undefined){
          $scope.booking.dropDetail.date = undefined;
          $scope.refData.dropMinDate = angular.copy(newValue);
          $scope.refData.dropMinDate.setHours($scope.refData.dropMinDate.getHours() + 2);
          $scope.isDropDateDisabled = false;
          $scope.isDatePlaceholder = false;
        }else{
          $scope.isDropDateDisabled = true;
          $scope.isDatePlaceholder = true;
        }
      });

      $scope.$watch('booking.dropDetail.date', function(newValue, oldValue) {
        console.log("date changed ");
        console.log(newValue);
        if(newValue != undefined){
          $scope.isDropDatePlaceholder = false;
        }else{
          $scope.isDropDatePlaceholder = true;
        }
      });

      $scope.userInfo = store.get('userInfo');
      $scope.booking.number = $scope.userInfo.number;

       $scope.submitBookingForm = function(){

        $rootScope.callMixPanel(MIX_PANEL_EVENTS.bookingDone.key, MIX_PANEL_EVENTS.bookingDone.value + $scope.booking.number);
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
            if(error.data !=undefined && error.data.errorMsg !=undefined){
                $rootScope.showAlert('Please try again' , error.data.errorMsg);
              }else{
                  //showAlertBox('Please try again' , error.data);
             }
          })
       }

       $scope.isValidated= function(){
          if(!$scope.booking.city || !$scope.booking.city.name){
            //Error Msg
            $rootScope.showAlert(errorMsgs.invalidForm , errorMsgs.cityIsEmpty);
            return false;
          }

          if($scope.booking.itemCount =="" || $scope.booking.itemCount == undefined || $scope.booking.itemCount==null){
            //Error Msg
            $rootScope.showAlert(errorMsgs.invalidForm , errorMsgs.itemCountIsEmpty);
            return false;
          }

          if($scope.booking.number =="" || $scope.booking.number == undefined || $scope.booking.number==null){
            //Error Msg
            $rootScope.showAlert(errorMsgs.invalidForm , errorMsgs.numberIsEmpty);
            return false;
          }

          if(!$scope.booking.pickupDetail.street || !$scope.booking.pickupDetail.street.name){
            //Error Msg
            $rootScope.showAlert(errorMsgs.invalidForm , errorMsgs.pickupStreetIsEmpty);
            return false;
          }

          if(!$scope.booking.pickupDetail.substreet || !$scope.booking.pickupDetail.substreet.name){
            //Error Msg
            $rootScope.showAlert(errorMsgs.invalidForm , errorMsgs.pickupSubStreetIsEmpty);
            return false;
          }
       
          if(!$scope.booking.dropDetail.street || !$scope.booking.dropDetail.street.name){
            //Error Msg
            $rootScope.showAlert(errorMsgs.invalidForm , errorMsgs.dropStreetIsEmpty);
            return false;
          }

          if(!$scope.booking.dropDetail.substreet || !$scope.booking.dropDetail.substreet.name){
            //Error Msg
            $rootScope.showAlert(errorMsgs.invalidForm , errorMsgs.dropSubStreetIsEmpty);
            return false;
          }

          if($scope.booking.pickupDetail.date =="" || $scope.booking.pickupDetail.date == undefined || $scope.booking.pickupDetail.date==null){
            //Error Msg
            $rootScope.showAlert(errorMsgs.invalidForm , errorMsgs.pickupDateIsEmpty);
            return false;
          }
          
          if($scope.booking.dropDetail.date =="" || $scope.booking.dropDetail.date == undefined || $scope.booking.dropDetail.date==null){
            //Error Msg
            $rootScope.showAlert(errorMsgs.invalidForm , errorMsgs.dropDateIsEmpty);
            return false;
          }

          return true;

       }

        $scope.reInitializeCities = function(id, exp){
          $rootScope.callMixPanel(MIX_PANEL_EVENTS.citiesLoaded.key, MIX_PANEL_EVENTS.citiesLoaded.value);
          projectApi.getResource('cities', id, exp).then(function(response){
              console.log("Suuccess Handler");
              $scope.refData.cities = response.data;
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


       $scope.refData.cities = store.get("cities");

       if(!$scope.refData.cities || $scope.refData.cities.length == 0){
           $scope.reInitializeCities();
       }

        $scope.getStreets = function(cityId, exp){
          $rootScope.callMixPanel(MIX_PANEL_EVENTS.streetsLoaded.key, MIX_PANEL_EVENTS.streetsLoaded.value);
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
               if(error.data !=undefined && error.data.errorMsg !=undefined){
                   $rootScope.showAlert('Please try again' , error.data.errorMsg);
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
               if(error.data !=undefined && error.data.errorMsg !=undefined){
                   $rootScope.showAlert('Please try again' , error.data.errorMsg);
                }else{
                  //showAlertBox('Please try again' , error.data);
                }
            })
        }

    $scope.cityComponentId = "cityRight";
    $scope.streetComponentId = "streetRight";
    $scope.dropStreetComponentId = "dropStreetRight";

    $scope.toggleCityRight = buildToggler('cityRight');
    $scope.togglePickupStreetRight = buildToggler('streetRight');
    $scope.toggleDropStreetRight = buildToggler('dropStreetRight');
   
    $scope.isOpenRight = function(componentId){
      return $mdSidenav(componentId).isOpen();
    };
    
    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
    
    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }

    $scope.close = function (componentId) {
      $mdSidenav(componentId).close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };

}]).filter('ordinal', function() {
  return function(input) {
    if (input == undefined) {
      return;
    };
    var s=["th","st","nd","rd"],
    v=input%100;
    return input+(s[(v-20)%10]||s[v]||s[0]);
  }
});