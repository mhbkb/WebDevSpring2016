var mongoose = require("mongoose");
/**
 * Created by maohao on 16/3/27.
 */
module.exports = function() {
    var FiledSchema = mongoose.Schema({
        label: String,
        type: {type: String,
               enum: ['TEXT', 'EMAIL', 'PASSWORD', 'OPTIONS', 'DATE', 'RADIOS', 'CHECKBOXES']},
        placeholder: String,
        options: [{label:String, value:String}]
    }, {collection: 'field'});
    return FiledSchema;
};