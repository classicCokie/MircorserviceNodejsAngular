const profile_routes = require('./profile_routes');

module.exports = function(app, db) {
    profile_routes(app, db);
};

