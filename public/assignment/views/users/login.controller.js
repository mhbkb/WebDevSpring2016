/**
 * Created by maohao on 16/2/22.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, UserService) {
        $scope.login = login;

        function login(user) {
            UserService.findUserByCredentials(user.username, user.password,
                function(response) {
                    if (response) {
                        console.log(123);
                        UserService.setCurrentUser(response);
                        $location.url("/profile");
                    }
                });
        }
    }
})();