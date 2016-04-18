/**
 * Created by maohao on 16/2/22.
 */
(function(){
    angular
        .module("TripTimeApp")
        .controller("CostController", CostController);

    function CostController($scope, $routeParams, TripService, CostService) {

        var tripId = $routeParams.tripId;
        $scope.tripId = tripId;

        TripService.findTripById(tripId)
            .then(function(response) {
                $scope.trip = response.data;
                CostService
                    .findCostsByTrip(tripId)
                    .then(function(response2) {
                        var costs = response2.data;
                        var dataset = [];
                        var min_cost= 999999;
                        var max_cost = 0;
                        var sum_cost = 0;
                        for(var i in costs) {
                            var cost_minute = (costs[i].spend / 60).toFixed(2);
                            var cost = {'x': new Date(costs[i].created), 'y': cost_minute};
                            dataset.push(cost);
                            if (new Number(cost_minute) > max_cost) {
                                max_cost = new Number(cost_minute);
                            }
                            if (new Number(cost_minute) < min_cost) {
                                min_cost = new Number(cost_minute);
                            }
                            sum_cost = sum_cost + new Number(cost_minute);
                        }
                        $scope.min_cost = min_cost;
                        $scope.max_cost = max_cost;
                        $scope.avg_cost = (sum_cost / costs.length).toFixed(2);
                        $scope.data = {'dataset': dataset};
                        $scope.options = {
                            axes: {
                                x: {
                                    key: 'x',
                                    type: 'date'
                                },
                                y: {
                                    max: new Number(max_cost) + 5,
                                    min: new Number(min_cost) - 5
                                }
                            },
                            series: [
                                {
                                    dataset: "dataset",
                                    type: ['line', 'dot'],
                                    color: "rgb(126, 181, 63)",
                                    axis: "y",
                                    key: 'y',
                                    label: 'The minutes cost at the time slot',
                                }
                            ]
                        };
                    })
            })
    }
})();