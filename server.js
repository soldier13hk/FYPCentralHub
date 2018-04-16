import express from 'express';
import index from './routes/index';
//import childprogram from './routes/childprogram';

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan'); //used to display something at log console
var bodyParser = require('body-parser');
var cons = require('consolidate');
//var exec = require('child_process').exec;
let app = express();

app.use(function(req, res, next) {
    var auth;
    console.log(req.headers)//Need this to check why the accept in header doesn't change
    if (req.headers.authorization) {
      auth = new Buffer(req.headers.authorization.substring(6), 'base64').toString().split(':');
    }

    if (!auth || auth[0] !== 'user' || auth[1] !== '123456') {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="UserName"');
        res.end('Unauthorized');
    } else {
        next();
    }
});

//need this to handle the post request
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// view engine setup
app.engine('html',cons.swig);
app.set('views', './views');
app.set('view engine', 'html');


app.use('/bin', express.static('./bin'));
app.use('/stylesheets', express.static('./public/stylesheets'));
app.use('/', index);
//app.use('/timerSwitch', timerSwitches);
//app.use('/securityCamera', securityCamera);
//app.use('/childprogram', childprogram);
/*var child;
child = exec("python timerSwitch.py", function (error, stdout, stderr) {
    sys.print('stdout: ' + stdout);
    sys.print('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
    }
});*/

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join('public/images')));

app.listen(3000, function () {
    console.log('Hello World listening on port 3000!');
});
