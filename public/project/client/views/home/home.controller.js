/**
 * Created by maohao on 16/2/22.
 */
(function(){
    angular
        .module("TripTimeApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $rootScope, TripService, GoogleMapService) {
        $scope.preferredDays = preferredDays;
        $scope.tripNearMe = tripNearMe;

        TripService
            .findAllActiveTrips()
            .then(function(response) {
                $scope.trips = response.data;
            })

        function preferredDays(preferredDays) {
            $scope.selectedPreferredDays = preferredDays;
        }

        function tripNearMe(mileCount) {
            $scope.tripNearCount = mileCount;

            TripService
                .findAllActiveTrips()
                .then(function(response) {
                    var currentTrips = response.data;
                    var currentUser = $rootScope.currentUser;
                    if(mileCount === '3' || mileCount === '5') {
                        if(!currentUser.home) {
                            $scope.message = "Please go to profile page to update your home address";
                            return;
                        }

                        $scope.trips = [];
                        for(var i in currentTrips) {
                            var currentTrip = currentTrips[i];
                            GoogleMapService.distancesCount(currentTrip.starting.placeId, currentUser.home.placeId)
                                .then(function(response) {
                                    var count = response.data - 0.0;
                                    if(count <= (mileCount - 0)) {
                                        currentTrip.distance = count;
                                        $scope.trips.push(currentTrip);
                                    }
                                })
                        }
                    } else {
                        $scope.trips = currentTrips;
                    }
                })
        }
    }

})();