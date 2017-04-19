// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngStorage', 'ngCordova', 'starter.controllers', 'starter.services'])
    .config(function ($ionicConfigProvider) {
        $ionicConfigProvider.tabs.position('bottom');
    })

.run(function($ionicPlatform, $localStorage) {
    $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
    $stateProvider

    .state('new', {
        url: '/new',
        templateUrl: 'templates/new.html',
        controller: 'NewCtrl'
    })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'TabsCtrl'
  })

  // Each tab has its own nav history stack:

  .state('tab.char', {
      url: '/char',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-char.html',
        controller: 'CharCtrl',
      }
    }
  })

  .state('tab.combat', {
      url: '/combat',
      views: {
        'menuContent': {
          templateUrl: 'templates/tab-combat.html',
          controller: 'CombatCtrl'
        }
      }
    })

  .state('tab.abilities', {
    url: '/abilities',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-abilities.html',
        controller: 'AbilitiesCtrl'
      }
    }
  })

  .state('tab.inventory', {
      url: '/inventory',
      views: {
          'menuContent': {
              templateUrl: 'templates/tab-inventory.html',
              controller: 'InventoryCtrl'
          }
      }
  })
      .state('tab.party', {
          url: '/party',
          views: {
              'menuContent': {
                  templateUrl: 'templates/party.html',
                  controller: 'PartyCtrl'
              }
          }
      });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/char');

});
