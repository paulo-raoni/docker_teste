var connection = require('../infra/ConnectionFactory.js');
var express = require('express');
var Sequelize = require('sequelize');
var model;
var log;
var log4js = require('log4js');
var logger = log4js.getLogger('[ProjetoDockerDAO]');
log4js.configure('./config/log4js.json');

function ProjetoDockerDAO() {
	model = require('../models/Model.js');
	log = global.PropertiesAWS.dbLog;
}

ProjetoDockerDAO.prototype.getDadosDAO = new Promise((resolve, reject) => (id) => {
	const retorno = {dados: "dados"};
	resolve(retorno);
});


module.exports = ProjetoDockerDAO;