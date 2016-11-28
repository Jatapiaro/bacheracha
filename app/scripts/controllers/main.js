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

    $scope.latitudeInicial;
    $scope.longitudeInicial;

    /*
    * Variables de mapas
    */
    $scope.bachesMapa = {
        center: {
            latitude: 19.4326077,
            longitude: -99.13320799999997,
        }, 
        zoom: 8
    };

    /*
    * Variables de inicio de sesión
    */
    $scope.email = "jacobo@gmail.com";
    $scope.password = "jacobojacobo";
    $scope.passwordConfirmation = "";
    $scope.erroresLogin = [];
    $scope.erroresRegistro = [];

    $scope.bumps = [];
    $scope.mapBump = [];


    /*
    * Variables de token
    */
    $scope.client="";
    $scope.access_token="";
    $scope.logeado=false;

    /*
    *Variables de registro baches
    */
    $scope.erroresBache=[];
    $scope.latitude=-1;
    $scope.longitude=-1;
    $scope.widthSteps=1;
    $scope.lengthSteps=1;
    $scope.depth=1;
    $scope.videoUrl="";
    $scope.volumen=0;
    $scope.costales=0;


    $scope.login = function(){
        if($scope.procedToLogin()){
            $http.post('http://localhost:3000/auth/sign_in', {
                email:$scope.email,
                password:$scope.password
            }).then(function (response) {
                $scope.client = response.headers('client');
                $scope.access_token = response.headers('access-token');
                $("#loginModal").modal("hide");
                $scope.logeado = true;
                $scope.showBumps();
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
            console.log(res.data);
            $scope.bumps = res.data;
            for (var i = 0; i < $scope.bumps.length; i++) {
                var c = {
                    latitude: $scope.bumps[i].latitude,
                    longitude: $scope.bumps[i].longitude,
                }

                var b = {
                    coords : c,
                    id : $scope.bumps[i].id
                    /*icon: {
                        url: "http://2.bp.blogspot.com/-EJ2Ymjgi2Uc/UsG46bKdUmI/AAAAAAAAIZ8/z-GNZkSA1ys/s1600/Bumpyroad.png",
                        scaledSize: 0.5
                    }*/
                }
                console.log(b);

                $scope.mapBump.push(b);
            }
        });
    }

    $scope.registrarBache = function(){
        $scope.procedToBacheCreate();
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

    $scope.procedToBacheCreate = function(){
        $scope.erroresBache.length = 0;
        $scope.erroresRegistro = [];

        if($scope.latitude==-1 || $scope.longitude==-1){
            $scope.erroresBache.push("Espera a que obtengamos tu ubicación");
        }
        if($scope.videoUrl==""){
            $scope.erroresBache.push("Agrega la URL del video");
        }

        if($scope.erroresBache.length==0){
            return true;
        }else{
            return false;
        }
    }

    $scope.onClick = function(id){
        console.log("El id: "+id);
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

    $scope.showBachesModal = function(){
        $("#bachesModal").modal("show");
    }

    $scope.showNewBacheModal = function(){
        $scope.latitude = -1;
        $scope.longitude = -1;
        navigator.geolocation.getCurrentPosition(function(position){
            $scope.latitude = position.coords.latitude;
            $scope.longitude = position.coords.longitude;
        });
        $("#newBacheModal").modal("show");
    }

    
    /*$interval(function(){
        navigator.geolocation.getCurrentPosition(function(position){
            console.log(position);
        });
    },15000)*/


});
