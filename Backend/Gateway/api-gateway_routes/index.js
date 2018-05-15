//Import the modules
const condition_routes = require('./condition_routes');
const condition_websocket= require('./condition_websocket');

module.exports = function(app,server, db) {
    condition_routes(app,server, db);
    condition_websocket(app,server, db);
};