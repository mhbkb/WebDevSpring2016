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

        $scope.currentUser = UserService.getCurrentUser();

        if (!$scope.currentUser) {
            $location.url("/home");
        }

        $scope.updateUser = updateUser;

        function updateUser(user) {
            $scope.error = null;
            $scope.message = null;

            UserService.updateUser(user._id, user,
                function(response){
                    $scope.currentUser = response;
                });

            if (user) {
                $scope.message = "User updated successfully";
                UserService.setCurrentUser($scope.currentUser);
            } else {
                $scope.message = "Unable to update the user";
            }
        }
    }
})();