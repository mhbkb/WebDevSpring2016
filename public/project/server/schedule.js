/**
 * Created by maohao on 16/4/7.
 */
module.exports = function(tripModel, costModel, googlemapService) {
    // node schedule
    var schedule = require('node-schedule');
    schedule.scheduleJob('*/15 * * * *', function(){
        // 1. Find all trips
        tripModel.findAllTrips()
            .then(function(trips) {
                // 2. Filter trips
                for(var i in trips) {
                    var days = trips[i].preferredDays;
                    var times = trips[i].preferredTimes;

                    var now = new Date();
                    var currentDay = now.getDay();
                    var currentHour = now.getHours();

                    if(days) {
                        // Pass days restrict
                        if((currentDay >= 1 && currentDay <= 5 && days.indexOf("workdays") > -1)
                            || ((currentDay === 0 || currentDay === 6) && days.indexOf("weekends") > -1)){
                            // Pass times restrict
                            if(times) {
                                for(var j in times) {
                                    var clocks = times[j].split(",");
                                    if(clocks.indexOf(currentHour + '') > -1) {
                                        // 3. Call google api to calculate time cost
                                        var startPlaceId = trips[i].starting.placeId;
                                        var destinationId = trips[i].destination.placeId;
                                        googlemapService.routedirection(startPlaceId, destinationId, storeTimeCost, trips[i]._id);
                                    }
                                }
                            }
                        }
                    }
                }
            })

        // 4. Store time to mongo
        function storeTimeCost(tripId, spend) {
            var cost = {};
            cost['spend'] = spend;
            costModel.createCostForTrip(tripId, cost)
                .then(function(res) {
                    console.log("create a cost for tripId: " + tripId + " the cost:" + spend);
                })
        }
    });
}