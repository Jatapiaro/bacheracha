'use strict';

/**
 * @ngdoc function
 * @name parcial1App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the parcial1App
 */
angular.module('parcial1App')
  .controller('MainCtrl', function ($scope,$sce,$http,$interval,$window) {


    $scope.videoList = [];
    $scope.videoIndex = -1;

    $scope.mockVideo = 'biZLZZFb468';
    $scope.dynamic = {
        video: $scope.mockVideo,
        change: function () {
            if ($scope.videoIndex == -1) {
                $scope.dynamic.video = $scope.mockVideo;
            } else {
                $scope.dynamic.video = $scope.videoList[$scope.videoIndex];
            }
        }
    };

    $scope.latitudeInicial;
    $scope.longitudeInicial;

    $scope.url = '';

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
    $scope.passwordConfirmation = "jacobojacobo";
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
    $scope.errorEdit = "";
    $scope.latitude=-1;
    $scope.longitude=-1;
    $scope.widthSteps=1;
    $scope.lengthSteps=1;
    $scope.depth=1;
    $scope.videoUrl="";
    $scope.volumen=0;
    $scope.costales=0;

    /*
    *Show bache
    */
    $scope.bache = null;


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
                $scope.showBumps();
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

                var b = $scope.bumps[i];
                $scope.videoList.push(b.videoUrl);

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
        if($scope.procedToBacheCreate()){
            $scope.videoUrl = $scope.videoUrl.replace("https://www.youtube.com/watch?v=", ""); 
            var req = {
                method: 'POST',
                url: 'http://localhost:3000/bumps.json',
                headers: {
                    'access-token':$scope.access_token,
                    'uid':$scope.email,
                    'client':$scope.client,
                    'token-type':"Bearer",
                    'Content-Type':'application/json'
                },
                data:{
                    "latitude":$scope.latitude,
                    "longitude":$scope.longitude,
                    "widthSteps":$scope.widthSteps,
                    "lengthSteps":$scope.lengthSteps,
                    "depth":$scope.depth,
                    "videoUrl":$scope.videoUrl,
                    "price":$scope.price,
                    "completed":false,
                    "kg":$scope.kg,
                    "costales":$scope.costales
                }
            }
        }
        $http(req).then(function(res){
            console.log(res.data);
            $("#newBacheModal").modal("hide");
            $scope.showBumps();
        });
    }

    $scope.modificarBache = function(){
        if($scope.bache.videoUrl==""){
            $scope.errorEdit = "El video no puede ser nulo";
        }else{
            $scope.errorEdit = "";
            $scope.bache.videoUrl = $scope.bache.videoUrl.replace("https://www.youtube.com/watch?v=", ""); 
            var req = {
                method: 'PUT',
                url: 'http://localhost:3000/bumps/'+$scope.bache.id+'.json',
                headers: {
                    'access-token':$scope.access_token,
                    'uid':$scope.email,
                    'client':$scope.client,
                    'token-type':"Bearer",
                    'Content-Type':'application/json'
                },
                data:{
                    "videoUrl": $scope.bache.videoUrl
                }
            }
            $http(req).then(function(res){
                console.log("Mod data: "+res.data);
                $("#editBacheModal").modal("hide");
                $scope.showBumps();
                $scope.videoIndex = -1;
                $scope.videoList.length = 0;
                $scope.videoList = [];
            });
        }
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

    $scope.searchBump = function(id){
        for(var i = 0; i < $scope.bumps.length; i++) {
            var b = $scope.bumps[i];
            //$scope.videoList.push(b.videoUrl);
            $scope.videoIndex = i;
            if(b.id==id){
                $scope.bache = b;
                $scope.bache.videoUrl = "https://www.youtube.com/watch?v="+$scope.bache.videoUrl
                console.log(b.videoUrl);
                //$scope.url = b.videoUrl;
                break;
            }
        }
        $scope.showBachesViewModal();
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

    $scope.showBachesViewModal = function(){
        $scope.dynamic.change();
        $("#viewBacheModal").modal("show");
    }

    $scope.showNewBacheModal = function(){
        $scope.latitude = -1;
        $scope.longitude = -1;
        $scope.calcular();
        navigator.geolocation.getCurrentPosition(function(position){
            $scope.latitude = position.coords.latitude;
            $scope.longitude = position.coords.longitude;
        });
        $("#newBacheModal").modal("show");
    }

    $scope.showBacheEditModal = function(){
        $("#viewBacheModal").modal("hide");
        $("#editBacheModal").modal("show");
    }

    /*
    * Calculos
    */
    $scope.calcular = function(){
        console.log("Estoy calculando perro");
        var lengthCm = $scope.lengthSteps*30;
        var widthCm = $scope.widthSteps*30;
        var depthCm = $scope.depth;

        var vol = lengthCm*widthCm*depthCm;

        $scope.kg = vol/6000;

        $scope.costales = Math.ceil($scope.kg/15);

        $scope.price = $scope.costales*192;
    }

    $scope.prueba = function(id){
        if(id==$scope.bache.id){
            return true;
        }else{
            return false;
        }
    }

    $scope.isUserBump = function(id){
        if($scope.bache.user.email==$scope.email){
            return true;
        }else{
            return false;
        }
    }

    
    /*$interval(function(){
        navigator.geolocation.getCurrentPosition(function(position){
            console.log(position);
        });
    },15000)*/


});
