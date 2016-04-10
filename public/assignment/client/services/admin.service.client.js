/**
 * Created by maohao on 16/2/22.
 */
(function(){
    angular
        .module("FormBuilderApp")
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
            return $http.get("/api/assignment/admin/user");
        }

        function adminCreateUser(user) {
            return $http.post("/api/assignment/admin/user", user);
        }

        function adminDeleteUserById(userId) {
            return $http.delete("/api/assignment/admin/user/" + userId);
        }

        function adminUpdateUser(userId, user) {
            return $http.put("/api/assignment/admin/user/" + userId, user);
        }

        function adminFindUserById (userId) {
            return $http.get("/api/assignment/admin/user/" + userId);
        }
    }
})();
