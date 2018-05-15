const WebSocket = require('ws');
var _client;

function EventWebSocket(url){

    var conn = new WebSocket(url);

    conn.on('error', function(ex) {
        console.log('checkin again');
    })

    conn.on('open', function(msg){
        console.log('now ready to send messages');
    })

    conn.on('close', function() {
        console.log('Connection terminated..');
        console.log('Lookin for: ', url);
        setTimeout( EventWebSocket, 1000, url, _client);
    });


    var callbacks = {};


    this.bind = function(event_name, callback){
        callbacks[event_name] = callbacks[event_name] || [];
        callbacks[event_name].push(callback);
        return this;// chainable
    };

    this.send = function(event_name, event_data, _id){
        //_client = client;
        var payload = JSON.stringify({event:event_name, id: _id, data: event_data});
        conn.send( payload , function() {
        }); // <= send JSON data to socket server
        return this;
    };

    function dispatch(event_name, message, id) {
        var chain = callbacks[event_name];
        if(typeof chain == 'undefined') return; // no callbacks for this event
        for(var i = 0; i < chain.length; i++){
            chain[i]( message, id)
        }
    }

    conn.onmessage = function(evt){
        var json = JSON.parse(evt.data)
        dispatch(json.event, json.data, json.id)
    };


    conn.onclose = function(){dispatch('close',null)}
    conn.onopen = function(){dispatch('open',null)}
};


module.exports = EventWebSocket;
