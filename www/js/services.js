angular.module('app.services', [])

  .factory('dataFactory', ['$http', function($http) {

     var urlBase = 'http://localhost:59273/api/';
    //var urlBase = 'http://www.debug.biopms.com:9097/api/';
    var dataFactory = {};

    dataFactory.checkLoginUser = function (loginUser) {

      var url =urlBase+'Admin/Login';

      return   $http({
        method: 'POST',
        url: url,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: function (obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: loginUser

      });
    };

    dataFactory.getTimeEntryCategoryList = function ( id) {
      return $http.get(urlBase +'TimeEntriesAPI/GetTimeEntryCategoryList?companyId='+id);
    };



   dataFactory.getEmployeeMonthyAttendance = function ( id) {
      return $http.get(urlBase +'AttendanceApi/GetMonthlyAttendance?employeeId='+id);
    };

    dataFactory.getEmployeeAttendanceSingle = function (id) {
      return $http.get(urlBase +'AttendanceApi/GetEmployeeAttendanceSingle?AttendanceId='+id);
    };




    dataFactory.timeEntryCheckInUser = function (UserCheckInApp) {

      var url =urlBase+'TimeEntriesAPI/UserCheckIn';

      return   $http({
        method: 'POST',
        url: url,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: function (obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: UserCheckInApp

      });
    };

    dataFactory.timeEntryCheckOutUser = function (UserCheckOutApp) {

      var url =urlBase+'TimeEntriesAPI/UserCheckOut';

      return   $http({
        method: 'POST',
        url: url,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: function (obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: UserCheckOutApp

      });
    };

    dataFactory.getMobileCheckInTEByEmployee = function ( employeeId ) {
      return $http.get(urlBase +'TimeEntriesAPI/GetMobileCheckInTEByEmployee?employeeId='+employeeId);
    };

	
	dataFactory.saveAttendance = function (attendance) {

          var url =urlBase+'AttendanceApi/SaveAttendance';

      return   $http({
        method: 'POST',
        url: url,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: function (obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: attendance

      });
    };
	
	
	
	
	

    return dataFactory;
  }])

.service('SessionService', [function(){

  var employee={};
  var timeEntryCheckIn={};
  var attendance={};
  

  this.setEmployee=function(employee){
    this.employee=employee;
  };

  this.getEmployee=function(){
    return this.employee;
  };



  this.setTimeEntryCheckIn=function(timeEntryCheckIn){
    this.timeEntryCheckIn=timeEntryCheckIn;
  };

  this.getTimeEntryCheckIn=function(){
    return this.timeEntryCheckIn;
  };
  
  
  this.setAttendance=function(attendance){
    this.attendance=attendance;
  };

  this.getAttendance=function(){
    return this.attendance;
  };


}]);

