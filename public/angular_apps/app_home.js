// Modules
require("../angular_views/home");

(function(){

  var dependencies = [
    "ngRoute",
    "views_home"
  ];

  angular
    .module("app_home", dependencies)
    .config(homeConfig);

  function homeConfig($interpolateProvider, $routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: "/public/angular_views/home/home.html"
      })
      .when('/api', {
        templateUrl: "/public/angular_components/api/api.html"
      });
  }

})();