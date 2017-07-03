var app = angular.module('app.landingController', [])

app.controller('landingCtrl',['$scope', function($scope) {


  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

}]);


app.controller('loginCtrl',['$scope','$http','$location','dataFactory','SessionService',function($scope ,$http,$location ,dataFactory,SessionService) {

  $scope.isLogin=false;
  $scope.isLoginbtn=false;
  console.log("ssssssssssssssssssss");


  $scope.userLogin=function(loginUser){

    //$scope.isLoginbtn=true;

    dataFactory.checkLoginUser(loginUser).success(function(employeeValue) {

      if(employeeValue){

        SessionService.setEmployee(employeeValue);
        $location.path('/monthlyAttendance');
      }
      else{
        $scope.isLogin=true;
        $scope.isLoginbtn=false;
      }

    }).error(function(res){

    });
  }

 

}])
