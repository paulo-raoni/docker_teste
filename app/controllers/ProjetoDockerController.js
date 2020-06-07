const moment = require('moment');
var connection = require('../infra/ConnectionFactory.js');;
var log4js = require('log4js');
var logger = log4js.getLogger('[ProjetoDockerController]');
log4js.configure('./config/log4js.json');
const Service = require('../service/Service');


exports.getDados = (req, res) => {
	return req;
};

