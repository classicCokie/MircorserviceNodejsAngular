//Condition Routes
module.exports = function(app, db) {

    let bodyParser = require('body-parser');
    let Condition     = require('./condition_model');

    //define middleware
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    //Get All Conditions
    app.get('/conditions', (req, res) => {
        console.log("got request.");
        Condition.find(function(err, conditions) {
            if (err)
                res.send(err);
            res.json(conditions);
        });
    });

    app.get('/fwconditions', (req, res) => {
        Condition.find(function(err, conditions) {
            if (err)
               res.send(err);
            res.send(conditions);
        });
    });

    //Add Condition
    app.post('/condition', (req, res) => {
        let condition = new Condition();
        condition.title = req.body.title;
        condition.description = req.body.description;

        condition.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Condition created!' });
        });
    });

    app.delete('/conditions/:id', (req, res) => {
        Condition.findByIdAndRemove(req.params.id, function (err, user) {
            if (err)
                throw err;
        });
        res.send( { message : 'Condition deleted!'});
    });

    app.delete('/conditions/all', (req, res) => {
        Condition.remove({}, function (err, user) {
            if (err)
                throw err;
        });
        res.send( { message : 'Condition deleted!'});
    });


};