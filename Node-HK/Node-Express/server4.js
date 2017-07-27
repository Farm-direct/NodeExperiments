var morgan = require('morgan'),
    express = require('express'),
    bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/').all(function(req, res, next) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    next();
}).get(function(req, res, next) {
    res.end('will send all the dishes to you');
}).post(function(req, res, next) {
    res.end('will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
}).delete(function(req, res, next) {
    res.end('deleting all dishes');
});

dishRouter.route('/:dishId').all(function(req, res, next) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    next();
}).get(function(req, res, next) {
    res.end('will send the dish to you: ' + req.params.dishId);
}).put(function(req, res, next) {
    res.write('updating the dish: ' + req.params.dishId + '\n');
    res.end('will update the dish to you: ' + req.body.name + ' with ' + req.body.description);
}).delete(function(req, res, next) {
    res.end('deleting dish : ' + req.params.dishId);
});

app.use('/dishes', dishRouter);

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function() {
    console.log(`Server running at http://${hostname}:${process.env.PORT}/`);
});