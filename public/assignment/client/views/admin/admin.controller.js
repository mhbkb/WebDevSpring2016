/**
 * Created by maohao on 16/2/22.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, AdminService)
    {
        $scope.remove = remove;
        $scope.update = update;
        $scope.add    = add;
        $scope.select = select;

        $scope.sortType     = 'username'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order

        function init() {
            AdminService
                .adminFindAllUsers()
                .then(handleSuccess, handleError);
        }
        init();

        function remove(user)
        {
            AdminService
                .adminDeleteUserById(user._id)
                .then(handleSuccess, handleError);
        }

        function update(user)
        {
            AdminService
                .adminUpdateUser(user._id, user)
                .then(
                    function(response) {
                        $scope.users = response.data;
                        $scope.user = null;
                    }
                    , handleError);
        }

        function add(user)
        {
            AdminService
                .adminCreateUser(user)
                .then(
                    function(response) {
                        $scope.users = response.data;
                        $scope.user = null;
                    }
                    , handleError);
        }

        function select(user)
        {
            $scope.user = angular.copy(user);
        }

        function handleSuccess(response) {
            $scope.users = response.data;
        }

        function handleError(error) {
            $scope.error = error;
        }
    }
})();