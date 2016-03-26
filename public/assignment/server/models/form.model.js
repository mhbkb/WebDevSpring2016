/**
 * Created by maohao on 16/3/10.
 */
var mock = require("./form.mock.json");
module.exports = function(uuid) {
    var api = {
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        findFormByTitle: findFormByTitle,
        findFormById: findFormById,

        findFieldsByFormId: findFieldsByFormId,
        findFieldById: findFieldById,
        deleteFieldById: deleteFieldById,
        createFieldForForm: createFieldForForm,
        updateFieldForForm: updateFieldForForm
    };
    return api;

    function createFormForUser(userId, form) {
        form["_id"] = uuid.v4();
        form["userId"] = userId;
        form["fields"] = new Array();
        mock.push(form);
        return form;
    }

    function findAllFormsForUser(userId) {
        var result = [];
        for(var i in mock){
            if(mock[i]['userId'] == userId){
                result.push(mock[i]);
            }
        }
        return result;
    }

    function deleteFormById(formId) {
        for(var i in mock){
            if(mock[i]['_id'] == formId){
                mock.splice(i, 1);
            }
        }
        return mock;
    }

    function updateFormById(formId, newForm) {
        for(var i in mock){
            if(mock[i]['_id'] == formId){
                mock[i] = newForm;
                return mock[i];
            }
        }
    }

    function findFormByTitle(title) {
        var result = [];
        for(var i in mock){
            if(mock[i]['title'] == title){
                result.push(mock[i]);
            }
        }
        return result;
    }

    function findFormById(formId) {
        for(var i in mock){
            if(mock[i]['_id'] == formId){
                return mock[i];
            }
        }

        return null;
    }

    function findFieldsByFormId(formId) {
        for(var i in mock){
            if(mock[i]['_id'] == formId){
                return mock[i]["fields"];
            }
        }
        return null;
    }

    function findFieldById(formId, fieldId) {
        for(var i in mock){
            if(mock[i]['_id'] == formId){
                var fields = mock[i]["fields"];
                for(var j in fields){
                    if(fields[j]["_id"] == fieldId) {
                        return fields[j];
                    }
                }
            }
        }
        return null;
    }

    function deleteFieldById(formId, fieldId) {
        for(var i in mock){
            if(mock[i]['_id'] == formId){
                var fields = mock[i]["fields"];
                for(var j in fields){
                    if(fields[j]["_id"] == fieldId) {
                        mock[i]["fields"].splice(j, 1);
                        return mock[i]["fields"];
                    }
                }
            }
        }
        return null;
    }

    function createFieldForForm(formId, field) {
        for(var i in mock){
            if(mock[i]['_id'] == formId){
                field['_id'] = uuid.v4();
                mock[i].fields.push(field);
                return mock[i]["fields"];
            }
        }
        return null;
    }

    function updateFieldForForm(formId, fieldId, field) {
        for(var i in mock){
            if(mock[i]['_id'] == formId){
                var fields = mock[i]["fields"];
                for(var j in fields){
                    if(fields[j]["_id"] == fieldId) {
                        mock[i]["fields"][j] = field;
                        return mock[i]["fields"];
                    }
                }
            }
        }
        return null;
    }
}