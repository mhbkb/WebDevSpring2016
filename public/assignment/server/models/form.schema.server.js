/**
 * Created by maohao on 16/3/27.
 */
var mongoose = require("mongoose");

module.exports = function() {

    var FieldSchema = require("./field.schema.server.js")();

    var FormSchema = mongoose.Schema({
        userId: String,
        title: {type: String, default: 'New Form'},
        fields: [FieldSchema],
        created: {type: Date, default: Date.now},
        updated: {type: Date, default: Date.now}
    }, {collection: 'form'});
    return FormSchema;
};