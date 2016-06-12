  // Ionic Starter App

  // angular.module is a global place for creating, registering and retrieving Angular modules
  // 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
  // the 2nd parameter is an array of 'requires'
  angular.module('app.projectX', ['ionic', 'ui.router','ngAnimate', 'angular-jwt','ionic-material',
  'angular-storage', 'ngResource','ionMdInput', 'app.env.config' ,'ngCordova', 'ngCookies', 'ngMaterial', 'ngMaterialDatePicker',
   'ngMessages', 'angularSpinners'])

      .run([ '$ionicPlatform', '$ionicPopup', '$timeout', function($ionicPlatform, $ionicPopup, $timeout) {
        $ionicPlatform.ready(function() {

          /*document.addEventListener("resume", function(){
            console.log("resume event fired");
            navigator.splashscreen.show();
          })

          document.addEventListener("pause", function(){
            console.log("pause event fired");
            navigator.splashscreen.show();
          })

          document.addEventListener("online", function(){
            console.log("online event fired");
            //navigator.splashscreen.show();
          })

          document.addEventListener("offline", function(){
            console.log("offline event fired");
            //navigator.splashscreen.show();
          })*/

      if (ionic.Platform.isIOS()){
           setTimeout(function () {
              navigator.splashscreen.hide();
           }, 3000 - 1000);
        }


          if(window.cordova && window.cordova.plugins.Keyboard) {
              // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
              // for form inputs)
              cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

              // Don't remove this line unless you know what you are doing. It stops the viewport
              // from snapping when text inputs are focused. Ionic handles this internally for
              // a much nicer keyboard experience.
              cordova.plugins.Keyboard.disableScroll(true);
            }
          if(window.StatusBar) {
            StatusBar.styleDefault();
          }

          if(window.Connection) {
              if(navigator.connection.type == Connection.NONE) {
                  $ionicPopup.confirm({
                      title: "Internet Disconnected",
                      content: "Internet is disconnected on your device."
                  })
                  .then(function(result) {
                      if(!result) {
                          ionic.Platform.exitApp();
                      }
                  });
              }
          }
    });
  }])

  .config([
    '$stateProvider', '$urlRouterProvider', '$httpProvider', 'jwtInterceptorProvider',

    function($stateProvider, $urlRouterProvider, $httpProvider, jwtInterceptorProvider) {

    //$urlRouterProvider.otherwise("/main/booking");

    $urlRouterProvider.otherwise(function($injector, $location) {
            var $state = $injector.get("$state");
            $state.go("main.booking");
        });

    /*jwtInterceptorProvider.tokenGetter = function(store) {
      return store.get('jwt');
    }*/

    jwtInterceptorProvider.tokenGetter = ['config', 'store', function(config, store) {
        // Skip authentication for any requests ending in .html
        if (config.url.substr(config.url.length - 5) == '.html') {
          return null;
        }

        return store.get('jwt');
    }];


    $httpProvider.interceptors.push('jwtInterceptor');

    $stateProvider

    .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: 'loginCtrl',
      data: {
              requiresLogin: false
            }
   })

    .state('login.getStarted', {
      url: "/started",
      views: {
            "mainContent": {
              templateUrl: "templates/getStarted.html",
              resolve : {
                eventFunction : ['$rootScope', 'MIX_PANEL_EVENTS', function($rootScope, MIX_PANEL_EVENTS){
                  console.log("event function called");
                  $rootScope.callMixPanel(MIX_PANEL_EVENTS.gettingStartedPageLoaded.key, MIX_PANEL_EVENTS.gettingStartedPageLoaded.value);
                  return true;
                }]
              }
            }
        }
   })

    .state('login.form', {
      url: "/form",
      views: {
            "mainContent": {
              templateUrl: "templates/loginForm.html",
              resolve : {
                eventFunction : ['$rootScope', 'MIX_PANEL_EVENTS', function($rootScope, MIX_PANEL_EVENTS){
                  console.log("event function called");
                  $rootScope.callMixPanel(MIX_PANEL_EVENTS.loginPageLoaded.key, MIX_PANEL_EVENTS.loginPageLoaded.value);
                  return true;
                }]
              }
            }
        }
   })

  .state('login.otp', {
      url: "/otp",
      views: {
            "mainContent": {
              templateUrl: "templates/loginOtp.html",
              resolve : {
                eventFunction : ['$rootScope', 'MIX_PANEL_EVENTS', function($rootScope, MIX_PANEL_EVENTS){
                  console.log("event function called");
                  $rootScope.callMixPanel(MIX_PANEL_EVENTS.submitOtpPageLoaded.key, MIX_PANEL_EVENTS.submitOtpPageLoaded.value);
                  return true;
                }]
              }
            }
        }
   })

  .state('login.signUp', {
      url: "/signUp",
      views: {
            "mainContent": {
              templateUrl: "templates/signUp.html",
              resolve : {
                eventFunction : ['$rootScope', 'MIX_PANEL_EVENTS', function($rootScope, MIX_PANEL_EVENTS){
                  console.log("event function called");
                  $rootScope.callMixPanel(MIX_PANEL_EVENTS.signupPageLoaded.key, MIX_PANEL_EVENTS.signupPageLoaded.value);
                  return true;
                }]
              }
            }
        }
   })

    .state('main', {
      url: "/main",
      abstract : true,   
      templateUrl: "templates/main.html",
      controller: 'mainCtrl',
      data: {
              requiresLogin: true
            }
   })

   .state('main.booking', {
      cache: false,
      url: "/booking",
      views: {
            'mainContent': {
                templateUrl: "templates/booking.html",
                controller: 'bookingCtrl',
                resolve : {
                eventFunction : ['$rootScope', 'MIX_PANEL_EVENTS', function($rootScope, MIX_PANEL_EVENTS){
                  console.log("event function called");
                  $rootScope.callMixPanel(MIX_PANEL_EVENTS.bookingPageLoaded.key, MIX_PANEL_EVENTS.bookingPageLoaded.value);
                  return true;
                }]
              }
            },

            'fabContent': {
                template: '<h1> Booking Footer</h1>',
            }
        }
   })
   .state('main.pricing', {
      url: "/pricing",
      views: {
            'mainContent': {
                templateUrl: "templates/pricing.html",
                controller: 'pricingCtrl',
                resolve : {
                eventFunction : ['$rootScope', 'MIX_PANEL_EVENTS', function($rootScope, MIX_PANEL_EVENTS){
                  console.log("event function called");
                  $rootScope.callMixPanel(MIX_PANEL_EVENTS.ratecardPageLoaded.key, MIX_PANEL_EVENTS.ratecardPageLoaded.value);
                  return true;
                }]
              }
            },

             'fabContent': {
                template: '<ion-content>Test Login</ion-content>',
            }
        }
   })
   .state('main.contactUs',{
     url: "/contactUs",
     views: {
            "mainContent": {
              templateUrl: "templates/contactUs.html",
              controller: 'contactCtrl',
              resolve : {
                eventFunction : ['$rootScope', 'MIX_PANEL_EVENTS', function($rootScope, MIX_PANEL_EVENTS){
                  console.log("event function called");
                  $rootScope.callMixPanel(MIX_PANEL_EVENTS.contactusPageLoaded.key, MIX_PANEL_EVENTS.contactusPageLoaded.value);
                  return true;
                }]
              }
            }
        }
   })
   .state('main.aboutUs',{
      url:"/aboutUs",
      views:{
        "mainContent":{
          templateUrl: "templates/aboutUs.html",
          resolve : {
                eventFunction : ['$rootScope', 'MIX_PANEL_EVENTS', function($rootScope, MIX_PANEL_EVENTS){
                  console.log("event function called");
                  $rootScope.callMixPanel(MIX_PANEL_EVENTS.aboutusPageLoaded.key, MIX_PANEL_EVENTS.aboutusPageLoaded.value);
                  return true;
                }]
              }
        }
      }
   })
   .state('confirmation',{
      cache: false,
      url:"/confirmation",
      templateUrl: "templates/confirmation.html",
      controller : "confirmationCtrl",
      resolve : {
                eventFunction : ['$rootScope', 'MIX_PANEL_EVENTS', function($rootScope, MIX_PANEL_EVENTS){
                  console.log("event function called");
                  $rootScope.callMixPanel(MIX_PANEL_EVENTS.bookingConfirmPageLoaded.key, MIX_PANEL_EVENTS.bookingConfirmPageLoaded.value);
                  return true;
                }]
              }
   })
   .state('main.account',{
      url:"/account",
      views:{
        "mainContent":{
          templateUrl: "templates/account.html",
          controller: 'accountCtrl',
          resolve : {
                eventFunction : ['$rootScope', 'MIX_PANEL_EVENTS', function($rootScope, MIX_PANEL_EVENTS){
                  console.log("event function called");
                  $rootScope.callMixPanel(MIX_PANEL_EVENTS.accountPageLoaded.key, MIX_PANEL_EVENTS.accountPageLoaded.value);
                  return true;
                }]
              }
        }
      }
   })
   .state('main.yourBookings',{
    cache: false,
     url: "/yourBookings",
     views: {
            "mainContent": {
              templateUrl: "templates/yourBookings.html",
              controller: 'yourBookingCtrl',
              resolve : {
                eventFunction : ['$rootScope', 'MIX_PANEL_EVENTS', function($rootScope, MIX_PANEL_EVENTS){
                  console.log("event function called");
                  $rootScope.callMixPanel(MIX_PANEL_EVENTS.bookingHistoryPageLoaded.key, MIX_PANEL_EVENTS.bookingHistoryPageLoaded.value);
                  return true;
                }]
              }
            }
        }
   })
   .state('main.bookingDetail',{
     cache: false,
     url: "/detail",
     views: {
            "mainContent": {
              templateUrl: "templates/yourBookingDetail.html",
              controller : 'yourBookingDetailCtrl',
              resolve : {
                eventFunction : ['$rootScope', 'MIX_PANEL_EVENTS', function($rootScope, MIX_PANEL_EVENTS){
                  console.log("event function called");
                  $rootScope.callMixPanel(MIX_PANEL_EVENTS.bookingDetailPageLoaded.key, MIX_PANEL_EVENTS.bookingDetailPageLoaded.value);
                  return true;
                }]
              }
            }
        }
   })

   .state('main.estimatePrice',{
     url: "/estimate",
     views: {
            "mainContent": {
              templateUrl: "templates/estimate.html",
              controller : 'estimateCtrl',
              resolve : {
                eventFunction : ['$rootScope', 'MIX_PANEL_EVENTS', function($rootScope, MIX_PANEL_EVENTS){
                  console.log("event function called");
                  $rootScope.callMixPanel(MIX_PANEL_EVENTS.estimatePageLoaded.key, MIX_PANEL_EVENTS.estimatePageLoaded.value);
                  return true;
                }]
              }
            }
        }
   })

   .state('main.tc',{
      url:"/tc",
      views:{
        "mainContent":{
          templateUrl: "templates/tc.html",
          resolve : {
                eventFunction : ['$rootScope', 'MIX_PANEL_EVENTS', function($rootScope, MIX_PANEL_EVENTS){
                  console.log("event function called");
                  $rootScope.callMixPanel(MIX_PANEL_EVENTS.tcPageLoaded.key, MIX_PANEL_EVENTS.tcPageLoaded.value);
                  return true;
                }]
              }
        }
      }
   })
   
  }])

.run([
  '$rootScope', '$state', 'store', 'jwtHelper', '$ionicLoading','$mdDialog', 'spinnerService',
  function($rootScope, $state, store, jwtHelper, $ionicLoading, $mdDialog, spinnerService) {

  $rootScope.showLoader = function() {
    /*$ionicLoading.show({
      templateUrl: "templates/loading.html"
    });*/

    spinnerService.show('html5spinner');

  };
  $rootScope.hideLoader = function(){
    /*$ionicLoading.hide();*/
   spinnerService.hide('html5spinner');
  };

  $rootScope.callMixPanel = function(key, jsonValue){
   mixpanel.track(key, jsonValue);
  };

/*  $rootScope.showAlertBox = function(title, msg){
    var alertPopup = $ionicPopup.alert({
       title: title,
       cssClass: 'error-alert-popup',
       template: msg
     });
     alertPopup.then(function(res) {
       console.log('Please try again later ');
     });
  };*/

  $rootScope.showAlert = function(title, msg) {
    console.log("show alert");
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title(title)
        .textContent(msg)
        .ariaLabel('Alert Box')
        .ok('OK')
        /*.targetEvent(ev)*/
    );
  };

  $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
    $rootScope.showLoader();
    if (toState.data && toState.data.requiresLogin) {
      //console.log("JWT token is "+store.get('jwt'));
      if (!store.get('jwt') || jwtHelper.isTokenExpired(store.get('jwt'))) {
        e.preventDefault();
        $state.go('login.getStarted', {}, {reload: true});
      }
    }
  });

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    $rootScope.hideLoader();
  });
}])

.factory('AuthInterceptor', [ '$rootScope', '$q', 'AUTH_EVENTS', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      console.error("error");
      if(response.status <= 0){
         $rootScope.$broadcast(AUTH_EVENTS.httpNotFound, "Services are offline");
         return $q.reject(response);
      }

      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized,
        404: AUTH_EVENTS.httpNotFound
      }[response.status], response);
      return $q.reject(response);
    }
  };
}])

.config(['$httpProvider', '$mdGestureProvider', function ($httpProvider, $mdGestureProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
     $mdGestureProvider.skipClickHijack();
}])

.directive('onFinishRender', ['$timeout', 'ionicMaterialMotion', 'ionicMaterialInk', 
function ($timeout, ionicMaterialMotion, ionicMaterialInk) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    ionicMaterialMotion.fadeSlideInRight();
                    ionicMaterialInk.displayEffect();
                });
            }
        }
    }
}]);


