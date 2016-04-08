/**
 * Created by maohao on 16/2/22.
 */
(function(){
    angular
        .module("TripTimeApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $scope, UserService) {
        $scope.location = $location;
        $scope.logout = logout;

        function logout() {
            UserService.logout();
            $location.url("/home");
        }
    }
})();