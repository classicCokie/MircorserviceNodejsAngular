const WebSocket = require('ws');
var _client;

function EventWebSocket(url){

    var conn = new WebSocket(url);

    conn.on('error', function(ex) {
        console.log('checkin again');
    });

    conn.on('open', function(msg){
        console.log('now ready to send messages');
    });

    // Look for new connection, when connection is closed
    conn.on('close', function() {
        console.log('Connection terminated..');
        console.log('Lookin for: ', url);
        setTimeout( EventWebSocket, 1000, url, _client);
    });

    //saving all callback functions
    var callbacks = {};

    // define bind function to bind callbacks to event names
    this.bind = function(event_name, callback){
        callbacks[event_name] = callbacks[event_name] || [];
        callbacks[event_name].push(callback);
        return this;
    };

    //Put Payload in correct JSON format when sending the message.
    this.send = function(event_name, event_data, _id){
        var payload = JSON.stringify({event:event_name, id: _id, data: event_data});
        conn.send( payload , function() {
        });
        return this;
    };

    //execute corresponding functions to events
    function dispatch(event_name, message, id) {
        var chain = callbacks[event_name];
        if(typeof chain === 'undefined') return; // no callbacks for this event
        for(var i = 0; i < chain.length; i++){
            chain[i]( message, id)
        }
    }
    //call the dispatch function once message is received
    conn.onmessage = function(evt){
        var json = JSON.parse(evt.data)
        dispatch(json.event, json.data, json.id)
    };

    conn.onclose = function(){dispatch('close',null)}
    conn.onopen = function(){dispatch('open',null)}
};


module.exports = EventWebSocket;
