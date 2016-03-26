/**
 * Created by maohao on 16/3/10.
 */
module.exports = function(app, formModel, userModel) {
    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);

    function findAllFormsForUser(req, res) {
        var userId = req.params.userId;
        res.json(formModel.findAllFormsForUser(userId));
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        res.json(formModel.findFormById(formId));
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        res.json(formModel.deleteFormById(formId));
    }

    function createFormForUser(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        res.json(formModel.createFormForUser(userId, form));
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        res.json(formModel.updateFormById(formId, form));
    }
}
