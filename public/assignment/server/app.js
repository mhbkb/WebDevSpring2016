/**
 * Created by maohao on 16/3/10.
 */
module.exports = function(app, db) {
    var userModel    = require("./models/user.model.server.js")();
    var formModel   = require("./models/form.model.server.js")();

    var userService  = require("./services/user.service.server.js") (app, userModel);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var fieldService = require("./services/field.service.server.js")(app, formModel);
}