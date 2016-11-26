'use strict';

/**
 * @ngdoc function
 * @name parcial1App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the parcial1App
 */
angular.module('parcial1App')
  .controller('MainCtrl', function ($scope,$http,$interval,$window) {


    $scope.email = "";
    $scope.password = "";
    $scope.erroresLogin = [];

    $scope.client="";
    $scope.access_token="";
    $scope.logeado=false;


    $scope.login = function(){
        if($scope.procedToLogin()){
            $http.post('http://localhost:3000/auth/sign_in', {
                email:$scope.email,
                password:$scope.password
            }).then(function (response) {
                $scope.client = response.headers('client');
                $scope.access_token = response.headers('access-token');
                console.log(response.headers('access-token'));
                console.log(response.headers('client'));
                $("#loginModal").modal("hide");
                //$("#login_button").modal("hide");
                $scope.client="";
                $scope.access_token="";
                $scope.logeado = true;
                console.log($scope.logeado);
            });
        }
    }

    $scope.showLoginModal = function(){
        $("#loginModal").modal("show");
    }

    $scope.procedToLogin = function(){

        $scope.erroresLogin.length = 0;
        $scope.erroresLogin = [];

        if($scope.email==""){
            $scope.erroresLogin.push("El email no puede estar vacio");
        }
        if($scope.password==""){
            $scope.erroresLogin.push("El password no puede estar vacio");
        }

        if($scope.email!="" && $scope.password!=""){
            return true;
        }else{
            return false;
        }
    }

});
