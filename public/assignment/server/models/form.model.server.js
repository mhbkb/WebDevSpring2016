/**
 * Created by maohao on 16/3/10.
 */
var q = require("q");
var mongoose = require("mongoose");

module.exports = function() {
    var FormSchema = require("./form.schema.server.js")();
    var FormModel = mongoose.model('Form', FormSchema);

    var api = {
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        findFormByTitle: findFormByTitle,
        findFormById: findFormById,
        getMongooseModel: getMongooseModel
    };
    return api;

    function createFormForUser(userId, form) {
        form["userId"] = userId;
        var deferred = q.defer();

        FormModel.create(form, function (err, doc) {

            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
         });

        return deferred.promise;
    }

    function findAllFormsForUser(userId) {
        var deferred = q.defer();

        FormModel.find({userId: userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function deleteFormById(formId) {
        var deferred = q.defer();

        FormModel.remove({_id: formId},
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function updateFormById(formId, newForm) {
        var deferred = q.defer();
        delete newForm._id;

        // find one retrieves one document
        FormModel.update({_id: formId}, newForm, {},
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

    function findFormByTitle(title) {
        var deferred = q.defer();

        FormModel.find({title: title}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findFormById(formId) {
        var deferred = q.defer();

        FormModel.findOne({_id: formId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function getMongooseModel() {
        return FormModel;
    }
}