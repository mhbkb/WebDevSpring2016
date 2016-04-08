/**
 * Created by maohao on 16/2/22.
 */
(function(){
    angular
        .module("TripTimeApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {

        var model = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserByUsername: findUserByUsername,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout: logout
        };

        return model;

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $http.get("/api/project/user/session/loggedin");
        }

        function logout() {
            return $http.post("/api/project/user/session/logout");
        }

        function findUserByCredentials(credentials) {
            return $http.post("/api/project/user/login", credentials);
        }

        function findAllUsers() {
            return $http.get("/api/project/user");
        }

        function createUser(user) {
            return $http.post("/api/project/user", user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/project/user/" + userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/project/user/" + userId, user);
        }

        function findUserByUsername (username) {
            return $http.get("/api/project/user?username=" + username);
        }
    }
})();
