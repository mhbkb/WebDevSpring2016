/**
 * Created by maohao on 16/2/22.
 */
(function(){
    angular
        .module("TripTimeApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/trip", {
                templateUrl: "views/trip/trip.view.html",
                controller: "TripController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/index", {
                templateUrl: "index.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    function getLoggedIn(UserService, $q) {
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response){
                var currentUser = response.data;
                UserService.setCurrentUser(currentUser);
                deferred.resolve();
            });

        return deferred.promise;
    }

    function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response) {
                var currentUser = response.data;
                if(currentUser) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/home");
                }
            });

        return deferred.promise;
    }
})();