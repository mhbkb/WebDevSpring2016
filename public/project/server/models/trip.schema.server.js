/**
 * Created by maohao on 16/3/27.
 */
var mongoose = require("mongoose");

module.exports = function() {

    var PlaceSchema = require("./place.schema.server.js")();

    // use mongoose to declare a user schema
    var TripSchema = mongoose.Schema({
        tripName: String,
        starting: PlaceSchema,
        destination: PlaceSchema,
        preferredTimes: [String],
        preferredDays: [String],
        isPublic: Boolean,
        userId: String
    }, {collection: 'trip'});
    return TripSchema;
};
