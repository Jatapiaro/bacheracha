'use strict';

/**
 * @ngdoc overview
 * @name parcial1App
 * @description
 * # parcial1App
 *
 * Main module of the application.
 */
angular
  .module('parcial1App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
  ])

  .config(function ($routeProvider,$httpProvider) {
    $httpProvider.defaults.useXDomain = true
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.common['Accept'] = "application/json"
    $httpProvider.defaults.headers.common['Content-Type'] = "application/json"
    /*$httpProvider.defaults.headers.common['Authorization'] = "eyJhbGciOiJIUzI1NiJ9.eyJwcmluY2lwYWwiOiJINHNJQUFBQUFBQUFBSlZTc1U0Y01SQ2RQUTRCUWtvQUNTUUthQ0JkdENlRjhpcEFCeEphQWVLNEJxUkV2dDFoTVhqdHhmYkNYWU91Z29JQ1JJS0VrbFwvZ1Q2REpCMFNrU0V1ZE51T0ZZdzhhRkZmMitQbTlOMjk4OHdEOVJzTmNyQmtYeGs5RkZuUHBtMVJ6R1JzTU04MXQyODhNNmdodGpsak9nUTJxd09QeVN1QUZVT0tSaGJGZ2p4MnlpbUF5cnF3MTl6QzAxWmFHVDBySFQ0dzdtaVY0cFBTK1wvOHdkS28wdkJBcHE3M3NKQnJaZ2xJV2h5cVJkVmJMV1NybkdhQXRHaWxxZ3duMVhHZ1wvcEJxWGxUSmhlNkFCSzFoUVlCVERNTXJ1clNKV2pzZkQrMFd4bXVhalUwVllER0V5Wk1lVHVWU2QxNjZ5N2UyZFRVZ2NIY0F6bFZ1clJvdXcrT0tqdmVQeEZKUVIxelpVMHN3MlpxSWp2Y0NkT1wvSjJweTVcL25QenFORWdCbDh2SHROMFY5Y2dFNnQ1XC9cL1R1ZEJlNkdGaVI3ckJhemFTc25OYU1HOHFkRXBcLzdwZVwvM3IxY0xyZFI4b09zZlRcLzg1aWRmMHF1dmFpU2xHbG1WYytNaVBhbzdQWkV2dkEyZVhjS2JiXC9PazFRZ1wvU2hwTVhxV0tJaXAzYkpXb3B1M2hhR050YUQycFZHdmJiaFQyZGtrelhkNXkyNVdmcUJvVW1kXC9MdTdPWis3cFwvUXIwSHpLUklTVStVb0JXczZTSit1VG1hbXI0MisrejNIXC8zTFwvOERsMWs2M3c4REFBQT0iLCJzdWIiOiJ1c2VyIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImV4cCI6MTQ3Nzg3NzY5NSwiaWF0IjoxNDc3ODc0MDk1fQ.eTcNPuStE3YY5lI0sAfzGTOwuXcFc7FLeiUe55xbgrI"*/
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
