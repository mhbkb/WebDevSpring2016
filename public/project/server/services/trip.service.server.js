/**
 * Created by maohao on 16/3/10.
 */
module.exports = function(app, tripModel) {
    app.post("/api/project/user/:userId/trip", createTrip);
    app.get("/api/project/trip/:tripId", findTripById);
    app.put("/api/project/trip/:tripId", updateTrip);
    app.delete("/api/project/trip/:tripId", deleteTripById)
    app.get("/api/project/user/:userId/trip", findTripsByUser);
    app.get("/api/project/trip/search/active", findAllActiveTrips)

    function createTrip(req, res) {
        var trip = req.body;
        var userId = req.params.userId;
        tripModel.createTripForUser(userId, trip)
            .then(
                function( doc ) {
                    res.json(doc);
                },
                function( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function findTripById(req, res) {
        var tripId = req.params.tripId;
        tripModel.findTripById(tripId)
            .then(
                // login user if promise resolved
                function ( doc ) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function updateTrip(req, res) {
        var tripId = req.params.tripId;
        var trip = req.body;
        tripModel.updateTrip(tripId, trip)
            .then(
                function ( doc ) {
                    res.json(trip);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteTripById(req, res) {
        var tripId = req.params.tripId;
        tripModel.deleteTripById(tripId)
            .then(
                // login user if promise resolved
                function ( doc ) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function findTripsByUser(req, res) {
        var userId = req.params.userId;
        tripModel.findTripsByUser(userId)
            .then(
                // login user if promise resolved
                function ( doc ) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllActiveTrips(req, res) {
        tripModel.findAllActiveTrips()
            .then(
                // login user if promise resolved
                function ( doc ) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }
}
