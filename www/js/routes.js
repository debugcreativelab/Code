var app = angular.module('app.routes', [])

app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.backButton.previousTitleText(false);
$ionicConfigProvider.backButton.icon('ion-chevron-left');
  $ionicConfigProvider.backButton.text('')


  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('landing', {
    url: '/page9',
    templateUrl: 'templates/landing.html',
    controller: 'landingCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('pMSDashboard', {
    url: '/dashboard',
    templateUrl: 'templates/pMSDashboard.html',
    controller: 'pMSDashboardCtrl'
  })

   .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
  })


  .state('timeEntry', {
    url: '/timeEntryCheckIn',
    templateUrl: 'templates/timeEntry.html',
    controller: 'timeEntryCtrl'
  })

    .state('attendance', {
    url: '/attendance',
    templateUrl: 'templates/attendance.html',
    controller: 'attendanceCtrl'
  })
  
  .state('checkOut', {
    url: '/timeEntryCheckOut',
    templateUrl: 'templates/checkOut.html',
    controller: 'checkOutCtrl'
  })

  .state('summary', {
    url: '/summary',
    templateUrl: 'templates/summary.html',
    controller: 'summaryCtrl'
  })
  
    .state('attendsummary', {
    url: '/attendsummary',
    templateUrl: 'templates/attendSummary.html',
    controller: 'attendSummaryCtrl'
  })

.state('monthlyAttendance', {
    url: '/monthlyAttendance',
    templateUrl: 'templates/monthlyAttendance.html',
    controller: 'monthlyAttCtrl'
  })

$urlRouterProvider.otherwise('/login')



});
