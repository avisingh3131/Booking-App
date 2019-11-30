// const _=require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {
    ObjectID
} = require('mongodb');

var {
    mongoose
} = require('./mongoose');
var {
    Note
} = require('./models/note');
var {
    User
} = require('./models/user');


var app = express();
app.use(cors());


app.use(bodyParser.json()); // support parsing of application/json type post data
app.use(bodyParser.urlencoded({
    extended: true
}));
//  app.use(function (req, res, next) {
//     // res.header('Access-Control-Allow-Origin', '*');
//     //  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     //  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//     // next();
//   });
// app.all("/*", function(req, res, next){
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//     next();
//   });

app.post('/login', (req, res) => {
    try {
        const data = req.body;
        const query = {
            $or: [{
                    userName: data.userNameOrEmail
                },
                {
                    userEmail: data.userNameOrEmail
                }
            ]

        }
        User.findOne(query, (err, user) => {
            if (!err && user) {
                if (user.password !== data.password) {
                    return res.send({
                        error: true,
                        description: "Password is incorrect"
                    })
                } else {
                    return res.send({
                        error: null,
                        description: "Successfully loged In!"
                    })
                }
            } else if (!err && !user) {
                return res.send({
                    error: true,
                    description: "Email id or user name is incorrect"
                })
            } else {
                return res.status(400).send({
                    error: true,
                    description: err
                });
            }
        })
    } catch (error) {
        console.log('error in /login', error);

    }

});

app.post('/createUser', (req, res) => {

    try {
        const data = req.body;
        const query = {
            $or: [{
                    userName: data.userName
                },
                {
                    userEmail: data.userEmail
                }
            ]

        }
        User.findOne(query, (err, user) => {
            if (!err && user) {
                return res.send({
                    error: null,
                    description: "User already exist"
                })
            } else if (!err && !user) {
                const user = new User(data);
                user.save().then((doc) => {
                    return res.send({
                        error: null,
                        description: "User added"
                    });
                }, (e) => {
                    return res.status(400).send(e);
                });
            } else {
                return res.status(400).send(err);
            }
        })
    } catch (error) {
        console.log('error in /createUser', error);

    }

});

app.post('/forgotpassword', (req, res) => {

    try {
        const data = req.body;
        const query = {
            $or: [{
                    userName: data.userName
                },
                {
                    userEmail: data.userEmail
                }
            ]

        }
        User.findOne(query, (err, user) => {
            if (!err && user) {
                return res.send({
                    error: null,
                    description: "user already exist"
                })
            } else if (!err && !user) {
                return res.send({
                    error: true,
                    description: "user does not exist"
                })
            } else {
                return res.status(400).send(err);
            }
        })
    } catch (error) {
        console.log('error in /forgotpassword', error);

    }

})

app.post('/updatepassword', (req, res) => {
    try {
        const data = req.body;
        const query = {
            $or: [{
                    userName: data.userNameOrEmail
                },
                {
                    userEmail: data.userNameOrEmail
                }
            ]

        }
        User.findOne(query, (err, user) => {
            if (!err && user) {
                user.set({
                    password: data.password
                });
                return res.send({
                    error: null,
                    description: "password changed"
                })
            } else {
                return res.status(400).send(err);
            }
        })
    } catch (error) {
        console.log('error in /updatepassword', error);

    }

})

app.post('/notes', (req, res) => {
    try {
        const data = {
            title: req.body.title,
            description: req.body.description
        }
        var note = new Note(data);
        note.save().then((doc) => {
            res.send({
                error: null,
                data: doc
            });
        }, (e) => {
            res.status(400).send(e);

        });
    } catch (error) {
        console.log('error in /notes', error);

    }

});

app.patch('/updatenote', (req, res) => {
    try {
        var body = req.body;
        if (!ObjectID.isValid(body._id)) {
            return res.status(404).send();

        } else {
            Note.findByIdAndUpdate(body._id, {
                $set: {
                    title: body.title,
                    description: body.description
                }
            }, {
                new: true
            }).then((note) => {
                if (!note) {
                    return res.status(404).send();

                }
                res.send({
                    error: null,
                    data: note
                });
            }).catch((e) => {
                return res.status(400).send();

            });
        }
    } catch (error) {
        console.log('error in /updatenote', error);
    }
});

app.get('/notes', (req, res) => {
    try {
        Note.find().then((notes) => {
            res.send(notes);
        }, (e) => {
            res.status(400).send(e)
        });
    } catch (error) {
        console.log('error in get /notes', error);
    }

});

app.delete('/notes/:id', (req, res) => {
    try {
        var id = req.params.id;
        if (!ObjectID.isValid(id)) {
            return res.status(404).send();

        }
        Note.findByIdAndRemove(id).then((note) => {
            if (!note) {
                return res.status(404).send();
            }
            res.send({
                error: null,
                data: note
            });
        }).catch((e) => {
            return res.status(400).send();

        });

    } catch (error) {
        console.log('error in get /notes/:id', error);

    }
});

app.listen(3000, () => {
    console.log("Server is up on 3000");

});