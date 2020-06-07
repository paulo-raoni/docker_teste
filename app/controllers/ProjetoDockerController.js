const moment = require('moment');
var connection = require('../infra/ConnectionFactory.js');;
var log4js = require('log4js');
var logger = log4js.getLogger('[gravame]');
log4js.configure('./config/log4js.json');
const Service = require('../service/Service');


exports.getDados = (req, res) => {
	
};

