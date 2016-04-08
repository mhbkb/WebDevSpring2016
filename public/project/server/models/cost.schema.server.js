/**
 * Created by maohao on 16/3/27.
 */
var mongoose = require("mongoose");

module.exports = function() {

    // use mongoose to declare a cost schema
    var CostSchema = mongoose.Schema({
        tripId: String,
        spend: Number,
        created: {type: Date, default: Date.now}
    }, {collection: 'cost'});
    return CostSchema;
};
