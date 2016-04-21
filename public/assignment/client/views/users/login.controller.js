/**
 * Created by maohao on 16/2/22.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, UserService, $location) {
        $scope.login = login;

        function login(user) {
            UserService
                .findUserByCredentials(user)
                .then(
                    function(response) {
                        if (response.data) {
                            UserService.setCurrentUser(response.data);
                            $location.url("/profile");
                        } else {
                            $scope.message = 'No Matched User Find!';

                        }
                    }
                );
        }
    }
})();