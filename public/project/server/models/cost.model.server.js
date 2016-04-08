/**
 * Created by maohao on 16/3/10.
 */
var q = require("q");
var mongoose = require("mongoose");

module.exports = function() {
    // load user schema
    var CostSchema = require("./cost.schema.server.js")();

    // create user model from schema
    var CostModel = mongoose.model('Cost', CostSchema);

    var api = {
        findCostsByTrip: findCostsByTrip,
        createCostForTrip: createCostForTrip
    };
    return api;

    function findCostsByTrip(tripId) {
        return CostModel.find({tripId: tripId})
            .then(
                function(costs) {
                    return costs;
                }
            );
    }

    function createCostForTrip(tripId, cost) {
        cost['tripId'] = tripId;
        return CostModel.create(cost)
            .then(
              function(cost) {
                  return cost;
              }
            );
    }
}