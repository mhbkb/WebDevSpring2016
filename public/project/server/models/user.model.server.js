/**
 * Created by maohao on 16/3/10.
 */
var q = require("q");
var mongoose = require("mongoose");

module.exports = function() {
    // load user schema
    var UserSchema = require("./user.schema.server.js")();

    // create user model from schema
    var UserModel = mongoose.model('User_Trip', UserSchema);

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
        var deferred = q.defer();
        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function createUser(user) {
        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        UserModel.create(user, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        // return a promise
        return deferred.promise;
    }

    function findUserByCredentials(username, password) {
        var deferred = q.defer();

        // find one retrieves one document
        UserModel.findOne(
            // first argument is predicate
            { username: username,
                password: password },

            // doc is unique instance matches predicate
            function(err, doc) {
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();

        // find one retrieves one document
        UserModel.findOne({ username: username},
            // doc is unique instance matches predicate
            function(err, doc) {
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();

        // find one retrieves one document
        UserModel.find({},
            // doc is unique instance matches predicate
            function(err, doc) {
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }

    function deleteUserById(userId) {
        var deferred = q.defer();

        // find one retrieves one document
        UserModel.remove({_id: userId},
            // doc is unique instance matches predicate
            function(err, doc) {
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();

        // find one retrieves one document
        UserModel.update({_id: userId}, user, {},
            // doc is unique instance matches predicate
            function(err, doc) {
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }
}