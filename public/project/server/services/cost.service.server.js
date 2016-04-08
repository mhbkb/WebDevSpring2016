/**
 * Created by maohao on 16/3/10.
 */
module.exports = function(app, costModel) {
    app.post("/api/project/trip/:tripId/cost", createCostForTrip);
    app.get("/api/project/trip/:tripId/cost", findCostsByTrip);

    function createCostForTrip(req, res) {
        var cost = req.body;
        var tripId = req.params.tripId;
        costModel.createCostForTrip(tripId, cost)
            .then(
                function( doc ) {
                    res.json(doc);
                },
                function( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function findCostsByTrip(req, res) {
        var tripId = req.params.tripId;
        costModel.findCostsByTrip(tripId)
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