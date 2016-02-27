/**
 * Created by maohao on 16/2/22.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope) {

        var model = {
             users : [
                {
                    "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                    "username": "alice", "password": "alice", "roles": ["student"]
                },
                {
                    "_id": 234, "firstName": "Bob", "lastName": "Hope",
                    "username": "bob", "password": "bob", "roles": ["admin"]
                },
                {
                    "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                    "username": "charlie", "password": "charlie", "roles": ["faculty"]
                },
                {
                    "_id": 456, "firstName": "Dan", "lastName": "Craig",
                    "username": "dan", "password": "dan", "roles": ["faculty", "admin"]
                },
                {
                    "_id": 567, "firstName": "Edward", "lastName": "Norton",
                    "username": "ed", "password": "ed", "roles": ["student"]
                }
            ],
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserByUsername: findUserByUsername,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
        };

        return model;

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }


        function findUserByCredentials(username, password, callback) {
            for(var u in model.users){
                if(model.users[u].username == username && model.users[u].password == password){
                    callback(model.users[u]);
                }
            }
            callback(null);
        }

        function findAllUsers(callback) {
            callback(model.users);
        }

        function createUser(user, callback) {
            user["_id"] = (new Date).getTime();
            model.users.push(user);
            callback(user);
        }

        function deleteUserById(userId, callback) {
            for(var u in model.users){
                if(model.users[u]._id == userId){
                    users.splice(u, 1);
                }
            }
            callback(users);
        }

        function updateUser(userId, user, callback) {
            for(var u in model.users){
                if(model.users[u]._id == userId){
                    model.users[u] = user;
                    callback(users[i]);
                }
            }
        }

        function findUserByUsername (username) {
            for (var u in model.users) {
                if (model.users[u].username === username) {
                    return model.users[u];
                }
            }
            return null;
        }
    }
})();
