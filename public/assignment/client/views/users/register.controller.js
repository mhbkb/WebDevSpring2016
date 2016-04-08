/**
 * Created by maohao on 16/2/22.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $scope, UserService) {
        $scope.message = null;
        $scope.register = register;

        function register(user) {
            $scope.message = null;
            if (user == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.password2) {
                $scope.message = "Please provide a password";
                return;
            }
            if (user.password != user.password2) {
                $scope.message = "Passwords must match";
                return;
            }

            if (user.emailStr.length > 0) {
                user.emails = user.emailStr.split(",");
            } else {
                user.emails = [];
            }

            if (user.phoneStr.length > 0) {
                user.phones = user.phoneStr.split(",");
            } else {
                user.phones = [];
            }

            UserService
                .findUserByUsername(user.username)
                .then(function(response) {
                    if(response.data != null) {
                        $scope.message = "User already exists!";
                        return;
                    } else {
                        UserService
                            .createUser($scope.user)
                            .then(function(response) {
                                UserService.setCurrentUser(response);
                                $location.url("/profile");
                            });
                    }
                })
        }
    }
})();