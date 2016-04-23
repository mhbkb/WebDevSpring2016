/**
 * Created by maohao on 16/2/22.
 */
(function(){
    angular
        .module("TripTimeApp")
        .controller("TripController", TripController);

    function TripController($scope, $uibModal, TripService, GoogleMapService) {
        // event handler declarations
        $scope.createTrip = createTrip;
        $scope.updateTrip = updateTrip;
        $scope.deleteTripById = deleteTripById;
        $scope.popTrip = popTrip;
        $scope.getStartingPlaces = getStartingPlaces;
        $scope.preferredDays = preferredDays;

        var userId = $scope.currentUser._id;
        TripService
            .findTripsByUser(userId)
            .then(function(response) {
                $scope.trips = response.data;
            })

        function createTrip(trip) {
            TripService
                .createTrip(userId, trip)
                .then(function(response) {
                    $scope.trips.push(response.data);
                    $scope.trip = null;
                });
        }

        function updateTrip(trip) {
            TripService
                .updateTrip(trip["_id"], trip)
                .then(function(response) {
                    for(var i = 0; i < $scope.trips.length; i++){
                        if($scope.trips[i]['_id'] == trip['_id']){
                            $scope.trips[i] = trip;
                            $scope.trip = null;
                            break;
                        }
                    }
                })
        }

        function deleteTripById(trip_id) {
            TripService
                .deleteTripById(trip_id)
                .then(function(response1) {
                    TripService.findTripsByUser(userId)
                        .then(function(response2) {
                            $scope.trips = response2.data;
                        })
                })
        }

        function popTrip(trip) {
            if(trip) {
                $scope.modalTitle = trip.tripName;
                $scope.trip = trip;
            } else {
                $scope.modalTitle = "New Trip";
                var newTrip = {};
                newTrip.isPublic = false;
                newTrip.preferredDays = [
                    "workdays", "weekends"
                ]
                $scope.trip = newTrip;
            }

            $scope.timeOptions = [
                {label: "12am-2am", value: "0,1"},
                {label: "2am-4am", value: "2,3"},
                {label: "4am-6am", value: "4,5"},
                {label: "6am-8am", value: "6,7"},
                {label: "8am-10am", value: "8, 9"},
                {label: "10am-12pm", value: "10, 11"},
                {label: "12pm-2pm", value: "12, 13"},
                {label: "2pm-4pm", value: "14, 15"},
                {label: "4pm-6pm", value: "16, 17"},
                {label: "6pm-8pm", value: "18, 19"},
                {label: "8pm-10pm", value: "20, 21"},
                {label: "10pm-12am", value: "22, 23"}
            ]
            $scope.daysOptions = [
                {label: "Workdays", value: "workdays"},
                {label: "Weekends", value: "weekends"}
            ]

            $uibModal.open({
                animation: true,
                templateUrl: 'myModal',
                scope: $scope,
                controller: ModalInstanceCtrl
            });
        }

        function getStartingPlaces(input) {
            if(input && input.length > 3) {
                $scope.matchPlaces = [];
                GoogleMapService.searchPlaces(input)
                    .then(function(response) {
                        var matchedResults = response.data.predictions;
                        var places = [];
                        for(var i in matchedResults) {
                            var place = {'name' : matchedResults[i].description,
                                'placeId'   : matchedResults[i].place_id };
                            places.push(place);
                        }
                        $scope.matchPlaces = places;
                    });
            }
        }

        function preferredDays(preferredDays) {
            $scope.selectedPreferredDays = preferredDays;
        }
    }

    angular.module('TripTimeApp').controller('ModalInstanceCtrl', ModalInstanceCtrl);

    function ModalInstanceCtrl($scope, $uibModalInstance, TripService) {

        $scope.addOrUpdateTrip = function (trip) {
            if(trip.isPublic == "1") {
                trip.isPublic = true;
            } else {
                trip.isPublic = false;
            }

            if(trip._id) {
                TripService.updateTrip(trip._id, trip)
                    .then(function(response) {
                        $scope.trip = response.data;
                    })
            } else {
                var userId = $scope.currentUser._id;
                TripService
                    .createTrip(userId, trip)
                    .then(function(response) {
                        $scope.trips.push(response.data);
                        $scope.trip = null;
                    });
            }

            $uibModalInstance.close();
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();