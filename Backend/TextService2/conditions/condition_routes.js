module.exports = function(app, db) {

    let bodyParser = require('body-parser');
    let Condition     = require('./condition_model');
    let requester = require('./modules/measured_request');
    const url = require('url');

    //Define Middleware
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());


    //Define Endpoints
    app.get('/conditions', (req, res) => {
        Condition.find(function(err, conditions) {
            if (err)
                res.send(err);
            res.json(conditions);
        });
    });

    app.get('/fwconditions', (req, res) => {
        requester.request(Object.assign(url.parse('http://192.168.2.185:8803/fwconditions'), {
            headers: {
                'User-Agent': 'Textservice2'
            },
            service: "Forwarded GET request Texterservice2 -> Texterservice3"
        }), (err, ress) => {
            if(!err)
                res.send(ress.body);
        });
    });

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