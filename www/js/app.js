  // Ionic Starter App

  // angular.module is a global place for creating, registering and retrieving Angular modules
  // 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
  // the 2nd parameter is an array of 'requires'
  angular.module('app.projectX', ['ionic', 'ui.router','ngAnimate'])

  .run(function($ionicPlatform) {
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
});
  })

  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/login/started");

    $stateProvider

    .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: 'loginCtrl' 
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

    .state('main', {
      url: "/main",
      abstract : true,   
      templateUrl: "templates/main.html",
      controller: 'mainCtrl'
   })

   .state('main.booking', {
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

  });
