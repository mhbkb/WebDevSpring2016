/**
 * Created by maohao on 16/3/10.
 */
module.exports = function(app, formModel, userModel) {
    app.post("/api/assignment/user", register);
    app.get("/api/assignment/user", findUser);
    app.get("/api/assignment/user/:userId", findUserById);
    app.put("/api/assignment/user/:userId", updateUser);
    app.delete("/api/assignment/user/:userId", deleteUserById)

    app.post("/api/assignment/user/login", login);
    app.get("/api/assignment/user/session/loggedin", loggedin);
    app.post("/api/assignment/user/session/logout", logout);

    app.get("/api/assignment/user/profile/:userId", profile);

    function register(req, res) {
        var user = req.body;
        user = userModel.createUser(user);
        req.session.currentUser = user;
        res.json(user);
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username != null && password != null) {
            findUserByCredentials(username, password, res);
        } else if(username != null) {
            findUserByUsername(username, res);
        } else {
            findAllUsers(res);
        }
    }

    function findAllUsers(res) {
        res.json(userModel.findAllUsers());
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        var user = userModel.findUserById(userId);
        res.json(user);
    }

    function findUserByUsername(username, res) {
        res.json(userModel.findUserByUsername(username));
    }

    function findUserByCredentials(username, password, res) {
        res.json(userModel.findUserByCredentials(username, password));
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        var newUser = userModel.updateUser(userId, user);
        req.session.currentUser = newUser;
        res.json(newUser);
    }

    function deleteUserById(req, res) {
        var userId = req.params.userId;
        res.json(userModel.deleteUserById(userId));
    }

    function profile(req, res) {
        var userId = req.params.userId;
        var user = userModel.findUserById(userId);
        res.json(user);
    }

    function login(req, res) {
        var credentials = req.body;
        var user = userModel.findUserByCredentials(credentials.username, credentials.password);
        req.session.currentUser = user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }
}
