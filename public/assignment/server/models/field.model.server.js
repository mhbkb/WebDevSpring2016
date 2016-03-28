/**
 * Created by maohao on 16/3/10.
 */
module.exports = function(formModel) {
    var Form = formModel.getMongooseModel();

    var api = {
        findFieldsByFormId: findFieldsByFormId,
        findFieldById: findFieldById,
        deleteFieldById: deleteFieldById,
        createFieldForForm: createFieldForForm,
        updateFieldForForm: updateFieldForForm
    };
    return api;

    function findFieldsByFormId(formId) {
        return Form.findById(formId)
            .then(
                function(form) {
                    return form.fields;
                }
            );
    }

    function findFieldById(formId, fieldId) {
         return Form
            .findById(formId)
            .then(
                function(form){
                    return form.fields.id(fieldId);
                }
            );
    }

    function deleteFieldById(formId, fieldId) {
         return Form
            .findById(formId)
            .then(
                function(form){
                    form.fields.id(fieldId).remove();
                    return form.save();
                }
            );
    }

    function createFieldForForm(formId, field) {
         return Form.findById(formId)
            .then(
                function(form) {
                    form.fields.push(field);
                    form.save();
                    return form.fields;
                }
            );
    }

    function updateFieldForForm(formId, fieldId, newField) {
         return Form
            .findById(formId)
            .then(
                function(form){
                    var field   = form.fields.id(fieldId);
                    field.label  = newField.label;
                    field.type = newField.type;
                    field.placeholder  = newField.placeholder;
                    field.options  = newField.options;
                    return form.save();
                }
            );
    }
}