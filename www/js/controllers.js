var app=angular.module('app.controllers', ["ionic", "ion-datetime-picker"]);





app.controller('pMSDashboardCtrl',['$scope','SessionService','dataFactory', function($scope,SessionService ,dataFactory ) {

  var employee =SessionService.getEmployee();

  if(employee){
    $scope.employee=employee;

  }



}])

app.controller('timeEntryCtrl',['$scope','SessionService','dataFactory','$cordovaGeolocation','$location', function($scope ,SessionService,dataFactory,$cordovaGeolocation,$location) {

  var employee =SessionService.getEmployee();

  if(employee){
    $scope.employee=employee;


    dataFactory.getMobileCheckInTEByEmployee(employee.Id).success(function(res) {



      if(res!=null){

        SessionService.setTimeEntryCheckIn(res);
        $location.path('/timeEntryCheckOut');

      }
      else{
        dataFactory.getTimeEntryCategoryList(1).success(function(res) {
		 
		 console.log(res);
		
          $scope.timeEntryCatList =res;
        }).error(function(res){
        });
      }
    }).error(function(res){
    });
  }


  $scope.userCheckIn =function(UserCheckInApp)
  {


    var posOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0
    };

    $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
      var lat = position.coords.latitude;
      var longit = position.coords.longitude;

      UserCheckInApp.Latitude =lat;
      UserCheckInApp.Longitude=longit;

      if(employee) {

        UserCheckInApp.EmployeeId=employee.Id;




        dataFactory.timeEntryCheckInUser(UserCheckInApp).success(function(mobileTimeEntry) {

          if(mobileTimeEntry!=null){
            SessionService.setTimeEntryCheckIn(mobileTimeEntry);
            $location.path('/timeEntryCheckOut');

          }
          else{


          }
        }).error(function(res){

          console.log(">>>>>>>>res>>>>>>>>>");
          console.log(res);
          console.log(">>>>>>>>res>>>>>>>>>");

        });
      }

    });

  }



}])

  /**
.controller('MapController', function($scope, $cordovaGeolocation, $ionicLoading,$ionicPlatform) {

     console.log(">>>KKKKKKKKKKK>>>");
     console.log(">>>KKKKKKKKKKK>>>");
     console.log(">>>KKKKKKKKKKK>>>");



    $ionicPlatform.ready(function() {

      $ionicLoading.show({
        template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
      });

      var posOptions = {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
      };


      $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
        var lat  = position.coords.latitude;
        var longit = position.coords.longitude;


        var myLatlng = new google.maps.LatLng(lat, longit);

        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        $scope.map = map;
        $ionicLoading.hide();

        //Wait until the map is loaded
        google.maps.event.addListenerOnce($scope.map, 'idle', function(){





          var marker = new google.maps.Marker({
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            position: myLatlng,
          });



          var infoWindow = new google.maps.InfoWindow({
            content: "Darshana Dinushal"
          });

          google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open($scope.map, marker);
          });



        });




      }, function(err) {
        $ionicLoading.hide();
        console.log(err);
      });




    });
  })

   **/

.controller('checkOutCtrl',['$scope','SessionService' ,'dataFactory','$cordovaGeolocation','$location',  function($scope ,SessionService,dataFactory ,$cordovaGeolocation,$location) {

  var employee =SessionService.getEmployee();
  var checkInDretails =SessionService.getTimeEntryCheckIn();

  if(employee && checkInDretails){
    $scope.employee=employee;
    $scope.timeEntryCheckIn=checkInDretails;
  }




  $scope.userCheckOut =function()
  {
    var UserCheckOutApp={}

    var posOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0
    };

    $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
      var lat = position.coords.latitude;
      var longit = position.coords.longitude;

      UserCheckOutApp.Latitude =lat;
      UserCheckOutApp.Longitude=longit;

      if(employee && checkInDretails) {

        UserCheckOutApp.EmployeeId=employee.Id;
        UserCheckOutApp.MobileTimeEntryId=checkInDretails.Id;

        dataFactory.timeEntryCheckOutUser(UserCheckOutApp).success(function(mobileTimeEntry) {

          if(mobileTimeEntry!=null){
            SessionService.setTimeEntryCheckIn(mobileTimeEntry);
            $location.path('/summary');

          }


        }).error(function(res){

        });
      }

    });

  }


}])


.controller('attendanceCtrl',['$scope','$ionicPopup','SessionService','dataFactory' ,'$cordovaGeolocation','$location','$filter', function($scope,$ionicPopup,SessionService ,dataFactory ,$cordovaGeolocation,$location,$filter) {

  var employee =SessionService.getEmployee();

  if(employee){
  
  
    $scope.employee=employee;
	
	 $scope.attendApp = {
       CheckIn: new Date(),
	   CheckOut: new Date(),
	   Date: new Date(),
	   
     };

  }
  
   $scope.attendanceClick =function(attendApp){

	   var todayDate = new Date();
     var todayDateFiltered = $filter('date')(todayDate, "dd-MM-yyyy"); 
     //console.log("ssssss" + todayDateFiltered)


	 var dateValue = $filter('date')(attendApp.Date, "dd-MM-yyyy"); 
	 
   if(dateValue<=todayDateFiltered)
   {

     
	 var CheckInValue = $filter('date')(attendApp.CheckIn, "dd-MM-yyyy HH:mm");  
	 
	 var CheckOutValue = $filter('date')(attendApp.CheckOut, "dd-MM-yyyy HH:mm");  
	 
	  var attendanceApp = {
       Date: dateValue,
	   CheckIn: CheckInValue,
	   CheckOut: CheckOutValue,
	   Latitude:attendApp.Latitude,
	   Longitude:attendApp.Longitude,
	   EmployeeId:employee.Id
     };
	 
          
	
	 
   // $location.path('/dashboard');
   
    var posOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0
    };
	
	
	
	//  $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
  //     var lat = position.coords.latitude;
  //     var longit = position.coords.longitude;
   var lat ="no latitude";
   var longit = "no longitude";

      attendanceApp.Latitude =lat;
      attendanceApp.Longitude=longit;

      if(employee) {

       

        dataFactory.saveAttendance(attendanceApp).success(function(mobileAttendance) {
         
          for (var i = 0; i<=mobileAttendance.length; i++){
              console.log("ssssssssssssss");
               console.log("sssssssss "+mobileAttendance[i].JsonErrorMsgList);
          }
     

          if(mobileAttendance!=null){
             SessionService.setAttendance(mobileAttendance);

             

            
			
            $location.path('/attendsummary');

          }
          else{


          }
        }).error(function(res){

          // console.log(">>>>>>>>res>>>>>>>>>");
          // console.log(res);
          // console.log(">>>>>>>>res>>>>>>>>>");

        });
      }

    // })
	
   
   }
   else
   {

     var addressPopup = $ionicPopup.show({
        title: "Enter a valid DATE!"+"</br>"+"no future dates are allowed!",
        scope: $scope,  
        buttons: [
          { text: 'Close' }
        ]
      });
     console.log("date is greater so cant continue!");
   }
  }



}])


.controller('attendSummaryCtrl',['$scope','SessionService','dataFactory' ,'$cordovaGeolocation','$location', function($scope,SessionService ,dataFactory ,$cordovaGeolocation ,$location) {

  var employee =SessionService.getEmployee();
  var attendanceDetails =SessionService.getAttendance();

         
  
  
  if(employee && attendanceDetails){
    $scope.employee=employee;
    $scope.mobileAttendance=attendanceDetails;

  }
  
  
  $scope.reDirectDashboard =function(){

    if(employee){
      SessionService.setEmployee(employee);
      $location.path('/dashboard');
    }

  }


}])


app.filter('makeSmaller',['$filter', function ($filter) {
       return function (item) {
       //return item.toUpperCase();

       if (item == "General working Day")
       {
         var workingDay;
         workingDay = "GWD";
         return workingDay;
       }
           else if(item=="Merchantile Holiday")
           {
             var workingDay;
             workingDay = "MH";
             return workingDay;
           }
              else{
                return item;
              }
  };
}])


.controller('HomeCtrl',['$scope','$ionicPopup','$ionicModal', '$filter','SessionService','$location','dataFactory', function($scope,$ionicPopup,$ionicModal,$filter ,SessionService ,$location, dataFactory ) {


}])


.controller('monthlyAttCtrl',['$scope','$ionicPopup','$ionicModal', '$filter','SessionService','$location','dataFactory', function($scope,$ionicPopup,$ionicModal,$filter ,SessionService ,$location, dataFactory ) {

$scope.moveToDashboard =function(){

      $location.path('/dashboard');
    }

    $scope.moveToHome =function(){

      $location.path('/home');
    }


    $scope.getDetails = function(id){
    $scope.selectedId = id;
    var AttId = id;
   


     dataFactory.getEmployeeAttendanceSingle(AttId).success(function(res) {


       $scope.attendanceDetails = res;
    
     var addressPopup = $ionicPopup.show({
        template: '<input type="text"   placeholder="Employee Name"  readonly> {{attendanceDetails.Employee.Name }}<br/> '+
                  '<input type="text"   placeholder="Date"  readonly> {{attendanceDetails.DateCreared | date: "yyyy-MM-dd"}}<br/> '+
                  '<input type="text"   placeholder="No Of Hours"  readonly> {{attendanceDetails.NoOfHours +" hours"}}<br/> '+
                  '<input type="text"   placeholder="OT minutes"  readonly> {{attendanceDetails.OTminutes +" minutes" }} <br/> '+
                  '<input type="text"   placeholder="LBTminutes"  readonly> {{attendanceDetails.LBTminutes +" minutes"}} <br/> ' +
                  '<input type="text"   placeholder="InTime" readonly> {{attendanceDetails.InTime | date: "HH:mm" }} <br/> ' +
                  '<input type="text"   placeholder="OutTime" readonly> {{attendanceDetails.OutTime | date: "HH:mm" }}',
        title: "ATTENDANCE DETAILS",
        scope: $scope,  
        buttons: [
          { text: 'Close' }
        ]
      });

    })
   
    }


    var employee =SessionService.getEmployee();

     dataFactory.getEmployeeMonthyAttendance(employee.Id).success(function(res) {
		 
		        console.log(res);
		
            $scope.timeEntryCatList = res.EmpAttendance_RPList;

        

        }).error(function(res){

        }); 

     app.filter('makeSmaller', function () {
       return function (item) {
      
       if (item == "General Working Day")
       {
         var workingDay;
         workingDay = "GWD";
         return workingDay;
       }
       else
       {
         return  item;
       }
  };
});

 

}])

.controller('monthlyAttendanceCtrl',['$scope','$location','SessionService','dataFactory' , function($scope, $rootScope, $stateParams, $timeout, Groups, Users, ionicMaterialMotion, ionicMaterialInk, $ionicPopup ,SessionService ,dataFactory) {

 $scope.moveToDashboard =function(){

      $location.path('/dashboard');
    }


  }])



.controller('summaryCtrl',['$scope','SessionService','$location' , function($scope ,SessionService ,$location ) {

  var employee =SessionService.getEmployee();
  var checkInDretails =SessionService.getTimeEntryCheckIn();

  if(employee && checkInDretails){
    $scope.employee=employee;
    $scope.timeEntryCheckIn=checkInDretails;

  }

  $scope.reDirectDashboard =function(){

    if(employee){
      SessionService.setEmployee(employee);
      $location.path('/dashboard');
    }

  }

}])




//