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
                .then(function(response) {
                    if (response) {
                        UserService.setCurrentUser(response);
                        $location.url("/profile");
                    }
                });
        }
    }
})();