/**
 * Created by david on 19/05/2015.
 */
module.exports = function (app) {

    var Race = require('../models/race.js');
    var User = require('../models/user.js');
    //GET - Return all races in the DB
    findAllRaces = function (req, res) {
        Race.find(function (err, races) {
            if (!races) {
                res.send(404, "There are no races")
            } else {
                if (!err) {
                    res.send(200, races);
                } else {
                    res.send(500, "Mongo Error");
                    console.log('ERROR: ' + err);
                }
            }
        });
    };

    findRaceByVicinity = function (req, res) {
        var userrequest,
            lngMin,
            lngMax,
            ltdMin,
            ltdMax;
        Group.findById(req.params.id, function (err, user) {
            if (!user) {

                res.send(404, 'No se encuentra este nombre de usuario, revise la petici?n');
            }
            if (!err) {
                lngMin = user.locationIni.Lng - 0.0015083; // - 10 km
                lngMax = user.locationIni.Lng + 0.0015083; // + 10 km
                ltdMin = user.locationIni.Ltd - 0.0015083; // - 10 km
                ltdMax = user.locationIni.Ltd + 0.0015083; // + 10 km
                userrequest = user;
            } else {
                res.statusCode = 500;
                console.log('Internal error(%d): %s', res.statusCode, err.message);
                res.send({error: 'Server error'});
            }
        });
        var query = Race.find()
            .where({
                'userrequest.locationIni.Lng': {'gte': lngMin, 'lte': lngMax},
                'userrequest.locationIni.Ltd': {'gte': ltdMin, 'lte': ltdMax}
            })
            .limit(50)
            .exec(function (err, races) {
                if (!err) {
                    res.send(races);
                } else {
                    console.log('ERROR: ' + err);
                }
            });
    };

    //GET - Return all races in the DB by ID_Race
    findRaceByID = function (req, res) {
        Race.findOne({"Name": req.params.Name}, function (err, race) {
            if (!race) {
                res.send(404, "Race not found");
            } else {
                if (!err) {
                    res.send(200, race);
                } else {
                    res.send(500, "Mongo Error");
                    console.log('ERROR: ' + err);
                }
            }
        });
    };

//POST - Insert a new Race in the DB
    createRace = function (req, res) {
        var race = new Race({
            Name: req.body.Name,
            Level: req.body.Level,
            LocationIni: req.body.LocationIni,
            Distance: req.body.Distance,
            Date: req.body.Date,
            Type: req.body.Type,
            Tags: req.body.Tags,
            Tour: req.body.Tour
        });
        race.save(function (err) {
            if (!err) {
                console.log('Created');
            } else {
                res.send(500, "Mongo Error");
                console.log('ERROR: ' + err);
            }
        });

        res.send(200, race);
    };

//PUT - Update a register already exists
    updateRace = function (req, res) {
        Race.findOne({"Name": req.params.Name}, function (err, race) {
            if (!race) {
                res.send(404, "Race not found");
            } else {
                race.Name = req.body.Name;
                race.Level = req.body.Level;
                race.LocationIni = req.body.LocationIni;
                race.Distance = req.body.Distance;
                race.Type = req.body.Type;
                race.Tags = req.body.Tags;
                race.Users = req.body.Users;
                race.Messages = req.body.Messages;
                race.Tour = req.body.Tour;

                race.save(function (err) {
                    if (!err) {
                        console.log('Updated');
                    } else {
                        res.send(500, "Mongo Error");
                        console.log('ERROR: ' + err);
                    }
                    res.send(200, race);
                });
            }
        });
    };

//DELETE - Delete a Race with specified ID
    deleteRace = function (req, res) {
        Race.findOne({"Name": req.params.Name}, function (err, race) {
            if (!race) {
                res.send(404, 'Race not found');
            } else {
                var users = race.Users;
                for (var i = 0; i < users.length; i++) {
                    User.findOne(users[i]._id, function (err, user) {
                        user.Races.pull(race._id);
                        user.save(function (err) {
                            if (!err) {
                                console.log('User   Removed');
                            } else {
                                console.log('ERROR: ' + err);
                                res.send(500, "Mongo Error");
                            }
                        });
                    });
                }
                race.remove(function (err) {
                    if (!err) {
                        console.log('Removed');
                        res.send(200, 'OK');
                    } else {
                        console.log('ERROR: ' + err);
                        res.send(500, "Mongo Error");
                    }
                });
            }
        });
    };
    //Borrar Carrera por ID
    deleteRaceID = function (req, res) {
        Race.findOne({"_id": req.params._id}, function (err, race) {
            if (!race) {
                res.send(404, 'Race not found');
            } else {
                var users = race.Users;
                for (var i = 0; i < users.length; i++) {
                    User.findOne(users[i]._id, function (err, user) {
                        user.Races.pull(race._id);
                        user.save(function (err) {
                            if (!err) {
                                console.log('User   Removed');
                            } else {
                                console.log('ERROR: ' + err);
                                res.send(500, "Mongo Error");
                            }
                        });
                    });
                }
                race.remove(function (err) {
                    if (!err) {
                        console.log('Removed');
                        res.send(200, 'OK');
                    } else {
                        console.log('ERROR: ' + err);
                        res.send(500, "Mongo Error");
                    }
                });
            }
        });
    };

    addUser = function (req, res) {
        var id = req.body._id;
        Race.findOne({_id: req.params.id}, function (error, race) {
            if (!race) {
                res.send(404, 'Race not found');
            } else {
                Race.findOne({_id: req.params.id, 'Users._id': id}, function (err, users) {
                    User.findOne({_id: id}, function (err, user) {
                        // console.log(user);
                        if (!err && users == null && user != null) {
                            var racepush = ({_id: user._id, Username: user.Username});
                            race.Users.push(racepush);
                            race.save(function (err) {
                                if (!err) {
                                    console.log('Updated');
                                } else {
                                    console.log('ERROR: ' + err);
                                }
                            });
                            var userpush = ({_id: race._id, Race: race.Name, State: 'Pending'});
                            user.Races.push(userpush);
                            user.save(function (err) {
                                if (!err) {
                                    console.log('Updated');
                                } else {
                                    console.log('ERROR: ' + err);
                                }
                            });
                            res.send(200, race);
                        } else {
                            res.send(400, 'This user is in the race already');
                        }
                    })
                });
            }
        });
    };

    addMessages = function (req, res) {
        Race.findById(req.params.id, function (err, message) {
            if (req.body.username != null && req.body.text != null)  message.messages.push(req.body);
            else console.log("Something wrong with: " + req.body);
            message.save(function (err) {
                if (err) console.log("Error: " + err);
                else console.log("User Inserted in Group");
            });
            res.send(200, message);
        });

    };

    deleteUser = function (req, res) {
        var id = req.body._id;
        Race.findOne({_id: req.params.id, 'Users._id': id}, function (err, race) {
            if (!race) {
                res.send(404, 'User Not Found')
            } else {
                race.Users.pull(id);
                race.save(function (err) {
                    if (err) res.send(500, 'Mongo Error');
                    else console.log('Race Removed');
                });
            }
        });
        User.findOne({_id: id}, function (err, user) {
            user.Races.pull(req.params.id);
            user.save(function (err) {
                if (err) res.send(500, 'Mongo Error');
                else res.send(200, 'OK');
            });
        });
    };

//Link routes and functions
    app.get('/race', findAllRaces);
    app.get('/user/:id/race', findRaceByVicinity);
    app.get('/race/:Name', findRaceByID);
    app.post('/race', createRace);
    app.put('/race/:Name', updateRace);
    app.delete('/race/:_id', deleteRaceID);
    app.delete('/race/:Name', deleteRace);
    app.put('/race/:id/user', addUser);
    app.delete('/race/:id/user', deleteUser);
    app.put('/race/:id/message', addMessages);

}
;