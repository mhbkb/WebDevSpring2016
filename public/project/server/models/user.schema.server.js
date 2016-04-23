/**
 * Created by maohao on 16/3/27.
 */
var mongoose = require("mongoose");

module.exports = function() {

    var PlaceSchema = require("./place.schema.server.js")();

    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        roles: [String],
        home: PlaceSchema
    }, {collection: 'trip_user'});
    return UserSchema;
};
