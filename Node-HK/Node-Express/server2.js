var morgan = require('morgan'),
    express = require('express'),
    bodyParser = require('body-parser');



var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());

app.all('/dishes', function(req, res, next) {
    res.writeHead(200);
    next();
});

app.get('/dishes', function(req, res, next) {
    res.end('will send all the dishes to you');
});

app.post('/dishes', function(req, res, next) {
    res.end('will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.delete('/dishes', function(req, res, next) {
    res.end('deleting all dishes');
});

app.get('/dishes:dishId', function(req, res, next) {
    res.end('will send the dish to you: ' + req.params.dishId);
});

app.put('/dishes:dishId', function(req, res, next) {
    res.write('updating the dish: ' + req.params.dishId + '\n');
    res.end('will update the dish to you: ' + req.body.name + ' with ' + req.body.description);
});

app.delete('/dishes/:dishId', function(req, res, next) {
    res.end('deleting dish : ' + req.params.dishId);
});

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function() {
    console.log(`Server running at http://${hostname}:${process.env.PORT}/`);
});