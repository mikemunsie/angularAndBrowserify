(function(){

  angular
    .module("views_home")
    .controller("views_home_homeController", homeController);

  function homeController($scope) {
    var title = "The Index Page";

    $scope.title = title;

  }

})();