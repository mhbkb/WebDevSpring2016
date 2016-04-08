/**
 * Created by maohao on 16/2/22.
 */
(function(){
    angular
        .module("TripTimeApp")
        .factory("CostService", CostService);

    function CostService($http) {

        var model = {
            createCostForTrip: createCostForTrip,
            findCostsByTrip: findCostsByTrip
        };

        return model;

        function findCostsByTrip(tripId) {
            return $http.get("/api/project/trip/" + tripId + "/cost");
        }

        function createCostForTrip (tripId, cost) {
            return $http.post("/api/project/trip/" + tripId + "/cost", cost);
        }
    }
})();
