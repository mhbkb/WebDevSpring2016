/**
 * Created by maohao on 16/2/22.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $location) {
        $scope.error = null;
        $scope.message = null;

        UserService
            .getCurrentUser()
            .then(function(response){
                $scope.currentUser = response.data;
                $scope.currentUser.emailStr = response.data.emails.toString();
                $scope.currentUser.phoneStr = response.data.phones.toString();
            })

        if (!$scope.currentUser) {
            $location.url("/home");
        }

        $scope.updateUser = updateUser;

        function updateUser(user) {
            $scope.error = null;
            $scope.message = null;

            if (user.phoneStr.length > 0) {
                user.phones = user.phoneStr.split(",");
            } else {
                user.phones = [];
            }

            if (user.emailStr.length > 0) {
                user.emails = user.emailStr.split(",");
            } else {
                user.emails = [];
            }

            UserService
                .updateUser(user._id, user)
                .then(function(response){
                    if (response) {
                        $scope.message = "User updated successfully";
                        $scope.currentUser = response.data;
                        $scope.currentUser.emailStr = response.data.emails.toString();
                        $scope.currentUser.phoneStr = response.data.phones.toString();
                    } else {
                        $scope.message = "Unable to update the user";
                    }
                });
        }
    }
})();