var app = require('express')();
var load = require('express-load');
var bodyParser = require('body-parser');
var Properties = require('../app/properties/PropertiesService');
var MensagemDTO = require('../app/dto/MensagemDTO');
var log4js = require('log4js');
var logger = log4js.getLogger('[express]');

const port = process.env.NODE_PORT_DEV || 8081;

var allowCorsDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, authorization, Content-Length, X-Requested-With');

	if ('OPTIONS' == req.method) {
		res.send(200);
	} else {
		next();
	}
};

app.use(allowCorsDomain);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');

	next();
});
app.all('/', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
	next();
});

app.use(function(error, req, res, next) {
	if (error) {
		res.status(400);
		res.send(new MensagemDTO(400, 1, 'Json com formato inválido!'));
	} else {
		next();
	}
});

app.use(function(req, res, next) {
	var params = {};
	params.token = req.headers.authorization;
	params.url = req.url;
	logger.trace('params.url: ', params.url);
	next();
});

function initApp() {
	load('properties', { cwd: 'app' }).then('routes').then('fila').into(app);

	app.listen(port, function() {
		logger.info('Servidor iniciado na porta ', port);
	});

	app.use(function(req, res) {
		res.status(404);
		res.json(new MensagemDTO(404, 0, 'Not Found', 'Serviço não mapeado no servidor.'));
	});
}

module.exports = function() {
	initApp();

	return app;
};
