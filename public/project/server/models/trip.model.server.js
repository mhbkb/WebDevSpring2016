/**
 * Created by maohao on 16/3/10.
 */
var q = require("q");
var mongoose = require("mongoose");

module.exports = function() {
    // load user schema
    var TripSchema = require("./trip.schema.server.js")();

    // create user model from schema
    var TripModel = mongoose.model('Trip', TripSchema);

    var api = {
        findTripsByUser: findTripsByUser,
        findTripById: findTripById,
        deleteTripById: deleteTripById,
        createTripForUser: createTripForUser,
        updateTrip: updateTrip,
        findAllTrips: findAllTrips,
        findAllActiveTrips: findAllActiveTrips
    };
    return api;

    function findTripsByUser(userId) {
        return TripModel.find({userId: userId})
            .then(
                function(trips) {
                    return trips;
                }
            );
    }

    function findTripById(tripId) {
        return TripModel
            .findById(tripId)
            .then(
                function(trip){
                    return trip;
                }
            );
    }

    function deleteTripById(tripId) {
        var deferred = q.defer();

        // find one retrieves one document
        TripModel.remove({_id: tripId},
            // doc is unique instance matches predicate
            function(err, doc) {
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function createTripForUser(userId, trip) {
        trip['userId'] = userId;
        return TripModel.create(trip)
            .then(
              function(trip) {
                  return trip;
              }
            );

    }

    function updateTrip(tripId, trip) {
        var deferred = q.defer();
        delete trip._id;

        // find one retrieves one document
        TripModel.update({_id: tripId}, trip, {},
            // doc is unique instance matches predicate
            function(err, doc) {
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }

    function findAllTrips() {
        return TripModel.find({})
            .then(
                function(trips) {
                    return trips;
                }
            );
    }

    function findAllActiveTrips() {
        return TripModel.find({isPublic: true})
            .then(
                function(trips) {
                    return trips;
                }
            );
    }
}