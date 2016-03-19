  // Ionic Starter App

  // angular.module is a global place for creating, registering and retrieving Angular modules
  // 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
  // the 2nd parameter is an array of 'requires'
  angular.module('app.projectX', ['ionic', 'ui.router','ngAnimate', 'angular-jwt', 'ion-autocomplete',
  'angular-storage', 'ngResource','ionMdInput', 'app.env.config' , 'formlyIonic','ngCordova'])

      .run(function($ionicPlatform, $ionicPopup) {
        $ionicPlatform.ready(function() {
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
                      content: "The internet is disconnected on your device."
                  })
                  .then(function(result) {
                      if(!result) {
                          ionic.Platform.exitApp();
                      }
                  });
              }
          }
    });
  })

  .config(function($stateProvider, $urlRouterProvider, $httpProvider, jwtInterceptorProvider) {

    //$urlRouterProvider.otherwise("/main/booking");

    $urlRouterProvider.otherwise( function($injector, $location) {
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
              templateUrl: "templates/getStarted.html"
            }
        }
   })

    .state('login.form', {
      url: "/form",
      views: {
            "mainContent": {
              templateUrl: "templates/loginForm.html"
            }
        }
   })

  .state('login.otp', {
      url: "/otp",
      views: {
            "mainContent": {
              templateUrl: "templates/loginOtp.html"
            }
        }
   })

  .state('login.signUp', {
      url: "/signUp",
      views: {
            "mainContent": {
              templateUrl: "templates/signUp.html"
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
                controller: 'bookingCtrl'
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
                controller: 'pricingCtrl'
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
              controller: 'contactCtrl'
            }
        }
   })
   .state('main.aboutUs',{
      url:"/aboutUs",
      views:{
        "mainContent":{
          templateUrl: "templates/aboutUs.html",
        }
      }
   })
   .state('confirmation',{
      url:"/confirmation",
      templateUrl: "templates/confirmation.html",
      controller : "confirmationCtrl"
   })
   .state('main.account',{
      url:"/account",
      views:{
        "mainContent":{
          templateUrl: "templates/account.html",
          controller: 'accountCtrl'
        }
      }
   })
   .state('main.yourBookings',{
    cache: false,
     url: "/yourBookings",
     views: {
            "mainContent": {
              templateUrl: "templates/yourBookings.html",
              controller: 'yourBookingCtrl'
            }
        }
   })
   .state('main.bookingDetail',{
     url: "/detail",
     views: {
            "mainContent": {
              templateUrl: "templates/yourBookingDetail.html",
            }
        }
   })
   
  })

.run(function($rootScope, $state, store, jwtHelper, $ionicLoading, $ionicPopup) {

  $rootScope.showLoader = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
  };
  $rootScope.hideLoader = function(){
    $ionicLoading.hide();
  };

  $rootScope.showAlertBox = function(title, msg){
    var alertPopup = $ionicPopup.alert({
       title: title,
       cssClass: 'error-alert-popup',
       template: msg
     });
     alertPopup.then(function(res) {
       console.log('Please try again later ');
     });
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
})

.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      console.error("error");
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized,
        404: AUTH_EVENTS.httpNotFound
      }[response.status], response);
      return $q.reject(response);
    }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});


