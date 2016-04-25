/**
 * Created by maohao on 16/3/10.
 */
var https = require('https');

module.exports = function(app) {
    app.get("/api/project/googlemap/places", searchPlaces);
    app.get("/api/project/googlemap/distances", distancesCount);

    var api = {
        routedirection : routedirection
    }
    return api;

    function searchPlaces(req, res) {
        var searchPlace = req.query.name;
        https.get("https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + searchPlace + "&types=address&key=AIzaSyBFdNiAlGPrmOEjw5ftc0sEPN3wq1wHbJg", function(res2) {
            var places = '';
            res2.on('data', function(data) {
                places += data;
            });

            res2.on('end', function(){
                res.json(JSON.parse(places));
            });
        });
    }

    function routedirection(startPlaceId, destinationId, storeTimeCost, tripId) {
        https.get("https://maps.googleapis.com/maps/api/directions/json?origin=place_id:" + startPlaceId +
            "&destination=place_id:" + destinationId + "&mode=driving&key=AIzaSyDlrWIna74FSSGBenjpHm9PYfj-GKRzFTM",
            function(res2) {
                var direction = '';
                res2.on('data', function(data) {
                    direction += data;
                });

                res2.on('end', function(){
                    var timeCost = JSON.parse(direction).routes[0].legs[0].duration.value;
                    storeTimeCost(tripId, timeCost);
                });
            });
    }

    function distancesCount(req, res) {
        var startPlaceId = req.query.startPlaceId;
        var destinationId = req.query.destinationId;

        https.get("https://maps.googleapis.com/maps/api/directions/json?origin=place_id:" + startPlaceId +
            "&destination=place_id:" + destinationId + "&mode=driving&key=AIzaSyDlrWIna74FSSGBenjpHm9PYfj-GKRzFTM",
            function(res2) {
                var direction = '';
                res2.on('data', function(data) {
                    direction += data;
                });

                res2.on('end', function(){
                    var distanceCount = JSON.parse(direction).routes[0].legs[0].distance.text.split(' ')[0];
                    res.json(JSON.parse(distanceCount));
                });
            });
    }
}
