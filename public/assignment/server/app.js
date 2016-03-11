/**
 * Created by maohao on 16/3/10.
 */
module.exports = function(app) {
    var uuid = require('node-uuid');
    var userModel    = require("./models/user.model.js")(uuid);
    var formModel   = require("./models/form.model.js")(uuid);

    var userService  = require("./services/user.service.server.js") (app, formModel, userModel);
    var formService = require("./services/form.service.server.js")(app, formModel, userModel);
    var fieldService = require("./services/field.service.server.js")(app, formModel, userModel);
}