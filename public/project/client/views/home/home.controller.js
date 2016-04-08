/**
 * Created by maohao on 16/2/22.
 */
(function(){
    angular
        .module("TripTimeApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, TripService) {
        TripService
            .findAllActiveTrips()
            .then(function(response) {
                $scope.trips = response.data;
            })
    }

})();