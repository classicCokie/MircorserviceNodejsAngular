module.exports = function(app, db) {

    const WebSocket = require('ws');
    const EventWebSocket = require('./modules/EventWebSocket');
    let Condition = require('./condition_model');

    //Create Websocket for forwarding
    let txtSocket = new EventWebSocket('ws://192.168.2.185:9003');

    //Get Websocket Server running
    const wss = new WebSocket.Server({ port: 9003 });
    console.log("started websocket server on 9003");

    //Establish connection and listen for messages
    wss.on('connection', function connection(ws) {

        ws.on('error', function() {
            console.log('handeling error');
        });

        //Return the data from the forwarded request
        txtSocket.bind('f_g_conditions_return', function(message, client_id) {
            ws.send(JSON.stringify({event:'f_g_conditions_return',id: client_id, data: message}));
        });

        ws.on('message', function incoming(message){
            message = JSON.parse(message);
            switch (message.event) {
                case 'g_conditions':
                    getCondition(ws)
                    break;
                case 'p_condition':
                    addCondition(message, ws);
                    break;
                case 'd_condition':
                    deleteCondition(message.data.id, ws);
                    break;
                case 'f_g_conditions':
                    txtSocket.send('f_g_conditions', message.data, message.id);
                default:
                    break;
            }
        });

        function getCondition(cl) {
            Condition.find(function(err, conditions) {
                if (err)
                    cl.send(err);
                cl.send(JSON.stringify({event:'g_conditions_return',id: message.id, data: conditions}));
            });
        }

        function addCondition(message, cl) {
            let condition = new Condition();
            condition.title = message.title;
            condition.description = message.description;
            condition.save(function(err) {
                if (err)
                    cl.send(JSON.stringify({event:'p_condition_return', id: message.id, data: err}));
                cl.send(JSON.stringify({event:'p_condition_return',id: message.id, data: 'condition created'}));
            });
        }

        function deleteCondition(id , cl) {
            Condition.findByIdAndRemove(id, function (err, user) {

                if (err)
                    cl.send(JSON.stringify({event:'d_condition_return', data: err}));
                cl.send(JSON.stringify({event:'d_condition_return', data: 'Deletetion Sucessfull'}));
            });
        }

    });

};