/**
 * Created by maohao on 16/3/10.
 */
module.exports = function(app, formModel) {
    app.get("/api/assignment/form/:formId/field", getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);

    var fieldModel = require("../models/field.model.server.js")(formModel);

    function getFieldsForForm(req, res) {
        var formId = req.params.formId;
        fieldModel.findFieldsByFormId(formId)
            .then(
                function( doc ) {
                    res.json(doc);
                },
                function( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function getFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.findFieldById(formId, fieldId)
            .then(
                function( doc ) {
                    res.json(doc);
                },
                function( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFieldFromForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.deleteFieldById(formId, fieldId)
            .then(
                function( doc ) {
                    res.json(doc);
                },
                function( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        fieldModel.createFieldForForm(formId, field)
            .then(
                function( doc ) {
                    res.json(doc);
                },
                function( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        fieldModel.updateFieldForForm(formId, fieldId, field)
            .then(
                function( doc ) {
                    res.json(doc);
                },
                function( err ) {
                    res.status(400).send(err);
                }
            );
    }
}
