/**
 * Created by maohao on 16/2/22.
 */
(function(){
    angular
        .module("TripTimeApp")
        .factory("AdminService", AdminService);

    function AdminService($http) {

        var model = {
            adminFindAllUsers: adminFindAllUsers,
            adminFindUserById: adminFindUserById,
            adminCreateUser: adminCreateUser,
            adminDeleteUserById: adminDeleteUserById,
            adminUpdateUser: adminUpdateUser
        };

        return model;

        function adminFindAllUsers() {
            return $http.get("/api/project/admin/user");
        }

        function adminCreateUser(user) {
            return $http.post("/api/project/admin/user", user);
        }

        function adminDeleteUserById(userId) {
            return $http.delete("/api/project/admin/user/" + userId);
        }

        function adminUpdateUser(userId, user) {
            return $http.put("/api/project/admin/user/" + userId, user);
        }

        function adminFindUserById (userId) {
            return $http.get("/api/project/admin/user/" + userId);
        }
    }
})();
