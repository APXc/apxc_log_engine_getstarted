const genRoutes = require('../routes/general');

module.exports = function (app) {
    app.use('/', genRoutes);
};
