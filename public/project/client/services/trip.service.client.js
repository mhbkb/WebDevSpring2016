/**
 * Created by maohao on 16/2/22.
 */
(function(){
    angular
        .module("TripTimeApp")
        .factory("TripService", TripService);

    function TripService($http) {

        var model = {
            findTripsByUser: findTripsByUser,
            findTripById: findTripById,
            deleteTripById: deleteTripById,
            createTrip: createTrip,
            updateTrip: updateTrip,
            findAllActiveTrips: findAllActiveTrips
        };

        return model;

        function findTripsByUser(userId) {
            return $http.get("/api/project/user/" + userId + "/trip");
        }

        function findTripById(tripId) {
            return $http.get("/api/project/trip/" + tripId);
        }

        function deleteTripById(tripId) {
            return $http.delete("/api/project/trip/" + tripId);
        }

        function updateTrip(tripId, trip) {
            return $http.put("/api/project/trip/" + tripId, trip);
        }

        function createTrip (userId, trip) {
            return $http.post("/api/project/user/" + userId + "/trip", trip);
        }

        function findAllActiveTrips() {
            return $http.get("/api/project/trip/search/active");
        }
    }
})();
