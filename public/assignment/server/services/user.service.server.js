/**
 * Created by maohao on 16/3/10.
 */
module.exports = function(app, userModel) {
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
        userModel.createUser(user)
            .then(
                function( doc ) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function( err ) {
                    res.status(400).send(err);
                }
            );
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
        userModel.findAllUsers()
            .then(
                // login user if promise resolved
                function ( doc ) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel.findUserById(userId)
            .then(
                // login user if promise resolved
                function ( doc ) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByUsername(username, res) {
        userModel.findUserByUsername(username)
            .then(
                // login user if promise resolved
                function ( doc ) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByCredentials(username, password, res) {
        userModel.findUserByCredentials(username, password)
            .then(
                // login user if promise resolved
                function ( doc ) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        userModel.updateUser(userId, user)
            .then(
                // login user if promise resolved
                function ( doc ) {
                    user['_id'] = userId;
                    req.session.currentUser = user;
                    res.json(user);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserById(req, res) {
        var userId = req.params.userId;
        userModel.deleteUserById(userId)
            .then(
                // login user if promise resolved
                function ( doc ) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function profile(req, res) {
        var userId = req.params.userId;
        userModel.findUserById(userId)
            .then(
                // login user if promise resolved
                function ( doc ) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function login(req, res) {
        var credentials = req.body;
        userModel.findUserByCredentials(credentials.username, credentials.password)
            .then(
                // login user if promise resolved
                function ( doc ) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }
}
