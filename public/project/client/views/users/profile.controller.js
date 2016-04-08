/**
 * Created by maohao on 16/2/22.
 */
(function(){
    angular
        .module("TripTimeApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $location) {
        $scope.error = null;
        $scope.message = null;

        UserService
            .getCurrentUser()
            .then(function(response){
                $scope.currentUser = response.data;
            })

        if (!$scope.currentUser) {
            $location.url("/home");
        }

        $scope.updateUser = updateUser;

        function updateUser(user) {
            $scope.error = null;
            $scope.message = null;

            UserService
                .updateUser(user._id, user)
                .then(function(response){
                    if (response) {
                        $scope.message = "User updated successfully";
                        $scope.currentUser = response.data;
                    } else {
                        $scope.message = "Unable to update the user";
                    }
                });
        }
    }
})();