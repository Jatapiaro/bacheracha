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

    /*
    * Variables de inicio de sesión
    */
    $scope.email = "jacobo@gmail.com";
    $scope.password = "jacobojacobo";
    $scope.passwordConfirmation = "";
    $scope.erroresLogin = [];
    $scope.erroresRegistro = [];


    /*
    * Variables de token
    */
    $scope.client="";
    $scope.access_token="";
    $scope.logeado=false;

    /*
    *Variables de registro baches
    */
    /*$scope.latitude;
    $scope.longitude;
    $scope.widthSteps;
    $scope.lengthSteps;
    $scope.depth;
    $scope.volumen;*/


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
                $scope.logeado = true;
                console.log($scope.logeado);
            });
        }
    }

    $scope.registrar = function(){
        if($scope.procedToRegistro()){
            $http.post('http://localhost:3000/auth', {
                email:$scope.email,
                password:$scope.password,
                password_confirmation:$scope.password_confirmation
            }).then(function (response) {
                $scope.client = response.headers('client');
                $scope.access_token = response.headers('access-token');
                console.log(response.headers('access-token'));
                console.log(response.headers('client'));
                $("#registrationModal").modal("hide");
                //$("#login_button").modal("hide");
                $scope.logeado = true;
                console.log($scope.logeado);
                $scope.password = "";
                $scope.passwordConfirmation = "";
            });
        }
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

    $scope.showBumps = function(){
        var req = {
          method: 'GET',
          url: 'http://localhost:3000/bumps.json',
          headers: {
            'access-token':$scope.access_token,
            'uid':$scope.email,
            'client':$scope.client,
            'token-type':"Bearer",
            'Content-Type':'application/json'
          }
        }

        $http(req).then(function(res){
            console.log('aqui estoy');
            var data = res.data;
            /*for (var i = 0; i < data.length; i++) {
                console.log(data[i].id);
            }*/
        });
    }

    $scope.procedToRegistro = function(){
        $scope.erroresRegistro.length = 0;
        $scope.erroresRegistro = [];

        if($scope.email==""){
            $scope.erroresRegistro.push("El email no puede estar vacio");
        }
        if($scope.password==""){
            $scope.erroresRegistro.push("El password no puede estar vacio");
        }
        if($scope.password.length<6){
            $scope.erroresRegistro.push("El password debe tener al menos 6 caracteres");
        }
        if($scope.password==""){
            $scope.erroresRegistro.push("La confirmación de password no puede estar vacia");
        }
        if($scope.passwordConfirmation!=$scope.password){
            $scope.erroresRegistro.push("Los passwords no coinciden");
        }

        if($scope.email!="" && $scope.password!="" && $scope.passwordConfirmation!="" && $scope.passwordConfirmation==$scope.password && $scope.password.length>=6 && $scope.passwordConfirmation.length>=6){
            return true;
        }else{
            return false;
        }
    }

    /*
    * Show modals methods
    */

    $scope.showRegisterModal = function(){
        $("#registrationModal").modal("show");
    }

    $scope.showLoginModal = function(){
        $("#loginModal").modal("show");
    }


    
    /*$interval(function(){
        navigator.geolocation.getCurrentPosition(function(position){
            console.log(position);
        });
    },15000)*/


});
