//Profile Routes
module.exports = function(app, db) {

    let bodyParser = require('body-parser');
    let Profile     = require('./profile_model');

    //define middleware
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    //Get All Profiles
    app.get('/profiles', (req, res) => {
        Profile.find(function (err, profiles) {
            if (err)
                res.send(err);
            res.json(profiles);
        });
    });

    app.get('/profile/:id', (req, res) => {
        console.log(req.params.id);
        Profile.find({_id: req.params.id}, function (err, profiles) {
            if (err)
                res.send(err);
            res.json(profiles);
        });
    });


    app.post('/profile', (req, res) => {
        let profile = new Profile();
        profile.first_name = req.body.first_name;
        profile.last_name = req.body.last_name;
        profile.short_description = req.body.short_description;
        profile.description = req.body.description;
        profile.website = req.body.website;
        profile.street = req.body.street;
        profile.zip_code = req.body.zip_code;
        profile.city = req.body.city;
        profile.email = req.body.email;
        profile.phone = req.body.phone;
        profile.fax = req.body.fax;
        profile.specialisation = req.body.specialisation;
        profile.education = req.body.education;
        profile.profile_img = req.body.profile_img;


        profile.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Profile created!' });
        });
    });

    app.delete('/profiles/all', (req, res) => {
        Profile.remove({}, function (err, user) {
            if (err)
                throw err;
        });
        res.send( { message : 'Profiles deleted!'});
    });



};