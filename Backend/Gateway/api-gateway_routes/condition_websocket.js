module.exports = function(app, db) {
    let bodyParser = require('body-parser');
    const EventWebSocket = require('./modules/EventWebSocket');
    var shortid = require('shortid');

    //Define the available services
    var textServices = [
        {socket : new EventWebSocket('ws://192.168.2.107:9003')},
        {socket :new EventWebSocket('ws://192.168.2.160:9003')},
        {socket :new EventWebSocket('ws://192.168.2.185:9003')}
    ];

    //Define middleware
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        next();
    });
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    //array for storing clients
    var clients = [];
    //Counter for iterating through services.
    var counter = 0;

    //iterate through sockets, and send messages
    function freeSocketSend(event, data, _id) {
        if(counter > 1) {
            counter = 0;
        } else {
            counter++;
        }
        textServices[counter].socket.send(event, data, _id);
    }

    //acctually send the data to a service
    function sendToService(event, _client, data) {
        var _id = shortid.generate();
        clients.push({id: _id, client: _client});
        freeSocketSend(event, data, _id);
    }

    //Get the correct client to send the resonse back to
    function getClient(_id) {
        for(var i = 0; i < clients.length; i++) {
            if(clients[i].id === _id) {
                var cl = clients[i].client;
                clients.splice(i,1);
                return cl;
            }
        }
    }

    //Loop through the services and bind the functions to be triggered when data is returned
    for(var i = 0; i < textServices.length; i++) {
        textServices[i].socket.bind('g_conditions_return', function(message, client_id) {
            var client = getClient(client_id);
            client.send(message);
        });
        textServices[i].socket.bind('p_condition_return', function(message, client_id) {
            var client = getClient(client_id);
            client.send(message);
        });
        textServices[i].socket.bind('d_conditions_return', function(message, client_id) {
            var client = getClient(client_id);
            client.send(message);
        });
        textServices[i].socket.bind('f_g_conditions_return', function(message, client_id) {
            console.log(clients)
            var client = getClient(client_id);
            client.send(message);
        });
    }

    //Define the data-endpoints and forward them to services
    app.get('/wsconditions', (req, res) => {
        sendToService('g_conditions', res, req.body);
    });

    app.post('/wscondition', (req, res) => {
        sendToService('p_condition', res, req.body);
    });

    app.delete('/wscondition', (req, res) => {
        sendToService('d_conditions', res, req.body);
    });

    app.get('/fwsconditions', (req, res) => {
        sendToService('f_g_conditions', res, req.body);
    });
    
};
