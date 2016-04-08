/**
 * Created by maohao on 16/2/22.
 */
(function(){
    angular
        .module("TripTimeApp")
        .factory("GoogleMapService", GoogleMapService);

    function GoogleMapService($http) {

        var model = {
            searchPlaces: searchPlaces
        };

        return model;

        function searchPlaces(input) {
            return $http.get("/api/project/googlemap/places?name=" + input);
        }
    }
})();
