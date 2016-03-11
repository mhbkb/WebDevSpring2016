/**
 * Created by maohao on 16/3/10.
 */
module.exports = function(app, formModel, userModel) {
    app.get("/api/assignment/form/:formId/field", getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);

    function getFieldsForForm(req, res) {
        var formId = req.params.formId;
        res.json(formModel.findFieldsByFormId(formId));
    }

    function getFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(formModel.findFieldById(formId, fieldId));
    }

    function deleteFieldFromForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(formModel.deleteFieldById(formId, fieldId));
    }

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        res.json(formModel.createFieldForForm(formId, field));
    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        res.json(formModel.updateFieldForForm(formId, fieldId, field));
    }
}
