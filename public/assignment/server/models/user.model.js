/**
 * Created by maohao on 16/3/10.
 */
var mock = require("./user.mock.json");
module.exports = function(uuid) {
    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers,
        deleteUserById: deleteUserById,
        updateUser: updateUser
    };
    return api;

    function findUserById(userId) {
        for(var u in mock) {
            if( mock[u]._id === userId ) {
                return mock[u];
            }
        }
        return null;
    }

    function createUser(user) {
        user._id = uuid.v4();
        mock.push(user);
        return user;
    }

    function findUserByCredentials(username, password) {
        for(var u in mock) {
            if( mock[u].username === username &&
                mock[u].password === password) {
                return mock[u];
            }
        }
        return null;
    }

    function findUserByUsername(username) {
        for (var u in mock) {
            if (mock[u].username === username) {
                return mock[u];
            }
        }
        return null;
    }

    function findAllUsers() {
        return mock;
    }

    function deleteUserById(userId) {
        for(var u in mock){
            if(mock[u]._id == userId){
                mock.splice(u, 1);
            }
        }
        return mock;
    }

    function updateUser(userId, user) {
        for(var u in mock){
            if(mock[u]._id == userId){
                mock[u] = user;
                return mock[u];
            }
        }
        return null;
    }
}