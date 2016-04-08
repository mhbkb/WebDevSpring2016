/**
 * Created by maohao on 16/3/27.
 */
var mongoose = require("mongoose");

module.exports = function() {

    // use mongoose to declare a user schema
    var PlaceSchema = mongoose.Schema({
        name: String,
        placeId: String
    }, {collection: 'place'});
    return PlaceSchema;
};
