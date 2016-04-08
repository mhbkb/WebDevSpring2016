/**
 * Created by maohao on 16/2/22.
 */
(function(){
    angular
        .module("TripTimeApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($location, $scope) {
        $scope.location = $location;
    }
})();