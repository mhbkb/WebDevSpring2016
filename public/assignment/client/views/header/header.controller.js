/**
 * Created by maohao on 16/2/22.
 */
(function(){
    angular
        .module("FormBuilderApp")
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