module.exports = function(app, db) {
    let bodyParser = require('body-parser');
    var http = require('http');
    const url = require('url');
    let requester = require('./modules/measured_request');
    var counter = 0;

    //Set the URLs of the available services
    let urls = [
        {url : "http://192.168.2.107:8803/"},
         {url : "http://192.168.2.185:8803/"},
         {url : "http://192.168.2.160:8803/"}
    ];


    // Setup the middleware
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        next();
    });
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());



    // Define Endpoints and forward data
    app.get('/conditions', (req, res) => {
        requester.request(Object.assign(url.parse(getFreeService() + 'conditions'), {
            headers: {
                'User-Agent': 'Gateway'
            },
            service: "GET FROM API Gateway -> Text Engine"
        }), (err, ress) => {
            if(!err)
                res.send(ress.body);
        });
    });

    app.get('/fwconditions', (req, res) => {
        requester.request(Object.assign(url.parse('http://192.168.2.107:8803/fwconditions'), {
        headers: {
            'User-Agent': 'Gateway'
        },
        service: "Forward GET FROM API Gateway -> Text Engine"
        }), (err, ress) => {
                console.log(err || ress);
                if(!err)
                    res.send(ress.body);
            });
    });

    app.post('/condition', (req, res) => {
        console.log(req.body);

        requester.request(Object.assign(url.parse(getFreeService() + 'condition'), {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: req.body,
            service: 'POST All From Api Gateway -> Text Engine'
        }), (err, ress) => {
            console.log(err || ress)
            if(!err)
                res.json(ress);
        });


    });

    app.delete('/conditions/:id', (req, res) => {
        requester.request(Object.assign(url.parse(getFreeService() + 'conditions/' + req.params.id), {
            method: "DELETE",
            headers: {
                'User-Agent': 'Gateway'
            },
            service: 'DELETE From Api Gateway -> Text Engine'
        }), (err, ress) => {
            console.log(err || ress.body)
            if(!err)
                res.json(ress);
        });
    });

    app.delete('/conditions/all', (req, res) => {
        console.log(getFreeService());
        requester.request(Object.assign(url.parse(getFreeService() + 'conditions/all'), {
            method: "DELETE",
            headers: {
                'User-Agent': 'Gateway'
            },
            service: 'DELETE From Api Gateway -> Text Engine'
        }), (err, ress) => {
            console.log(err || ress.body)
            if(!err)
                res.json(ress);
        });
    });

    //Iterae through services to distribute the requests.
    function getFreeService() {
        if(counter > 1) {
            counter = 0;
        } else {
            counter++;
        }
        return urls[counter].url;
    }



};