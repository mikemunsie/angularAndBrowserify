(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Modules
require("../angular_views/home");

(function(){

	var dependencies = [
		"views_home"
	];

	angular
		.module("app_home", dependencies);

})();
},{"../angular_views/home":7}],2:[function(require,module,exports){
(function(){

	var dependencies = [

	];

	angular
		.module("components_api", dependencies);

})();
},{}],3:[function(require,module,exports){
// Dependencies
require("../../angular_components/api/api.js");

// Modules
require("./services.js");
},{"../../angular_components/api/api.js":2,"./services.js":4}],4:[function(require,module,exports){
(function(){

	var dependencies = [
		"components_api"
	];

	angular
		.module("components_services", dependencies);

})();
},{}],5:[function(require,module,exports){
(function(){

	var dependencies = [
		"components_services"
	];

	angular
		.module("views_home", dependencies);

})();
},{}],6:[function(require,module,exports){
(function(){

	angular
		.module("views_home")
		.controller("views_home_homeController", homeController);

	function homeController($scope) {
		var title = "The Index Page";

		$scope.title = title;

	}

})();
},{}],7:[function(require,module,exports){
// Dependencies
require("../../angular_components/services");

// Modules
require("./home.js");
require("./homeController.js");
},{"../../angular_components/services":3,"./home.js":5,"./homeController.js":6}]},{},[1])