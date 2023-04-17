const express = require('express');
const app = express();
const router = express.Router();
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cors = require('cors');


app.use(helmet({
    contentSecurityPolicy : false
}));


const logSteam  = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a'});
app.use(morgan('combined', { stream : logSteam}));



// cors
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

let corsOptions = {
    origin: 'http://127.0.0.1:8080/',
    AccessControlAllowOrigin: '*',
    methods:'GET,POST,PUT,PATCH,DELETE, OPTIONS',
    allowedHeaders: 'Origin, Content-Type, Cookie, X-CSRF-TOKEN, Accept, Authorization, X-XSRF-TOKEN, Access-Control-Allow-Origin, Set-Cookie, access-control-allow-credentials, Cache-Control, Access-Control-Allow-Origin',
    credentials: true,
    preflightContinue: false,
};
app.use(cors());

//Settings APP
app.use(express.json());
require('./routes')(app, cors(corsOptions));
app.use(express.json());

//Output APP
console.log('PORT 3000');
app.listen(3000);


module.exports = app;
