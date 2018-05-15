const condition_routes = require('./condition_routes');
const condition_websocket = require('./condition_websocket');

module.exports = function(app, db) {
    condition_routes(app, db);
    condition_websocket(app, db);
};

