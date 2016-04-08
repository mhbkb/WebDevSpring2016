/**
 * Created by maohao on 16/2/22.
 */
(function(){
    angular
        .module("TripTimeApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
    }
})();