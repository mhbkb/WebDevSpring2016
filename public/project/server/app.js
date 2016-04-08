/**
 * Created by maohao on 16/3/10.
 */
module.exports = function(app) {
    var userModel    = require("./models/user.model.server.js")();
    var tripModel    = require("./models/trip.model.server.js")();
    var costModel    = require("./models/cost.model.server.js")();

    var userService  = require("./services/user.service.server.js") (app, userModel);
    var tripService  = require("./services/trip.service.server.js") (app, tripModel);
    var costService  = require("./services/cost.service.server.js") (app, costModel);
    var googlemapService  = require("./services/googlemap.service.server.js") (app);

    var schedule = require("./schedule.js")(tripModel, costModel, googlemapService);
}