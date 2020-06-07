var connection = require('../infra/ConnectionFactory.js');
var MensagemReturnDTO = require('../dto/MensagemReturnDTO');

var express = require('express');
var app = express();

var Sequelize = require('sequelize');
var AWSXRay = require('aws-xray-sdk');
var model;
var log;
var log4js = require('log4js');
var logger = log4js.getLogger('[GravameDAO]');
log4js.configure('./config/log4js.json');

function GravameDAO() {
	model = require('../models/Model.js');
	log = global.PropertiesAWS.dbLog;
}

GravameDAO.prototype.obter = new Promise((resolve, reject) => (idGravame) => {
	app.use(AWSXRay.express.openSegment('GravameDAO:obter'));
	var condicao = {};
	if (idGravame) {
		condicao = {
			idGravame: idGravame,
			regExcluido: 0
		};
	} else {
		condicao = {
			regExcluido: 0
		};
	}
	model
		.getGravame()
		.findAll({
			where: condicao,
			attributes: ['idGravame' /*, 'idTipoGravame', 'idTipoOperacao'*/ ],
			include: [{
					model: model.getTipoGravame(),
					as: 'tipoGravame',
					attributes: ['idTipoGravame', 'descTipoGravame']
				},
				{
					model: model.getTipoOperacao(),
					as: 'tipoOperacao',
					attributes: ['idTipoOperacao', 'descTipoOperacao']
				}
			]
		})
		.then(function (result) {
			resolve(result);
		})
		.catch(function (erro) {
			console.log('Erro no DAO', erro);
			connection.testConexao();
			reject(erro);
		});
	app.use(AWSXRay.express.closeSegment());
});

GravameDAO.prototype.obterPorTipoOperacaoGravame = function (param, callback) {
	var condicao = {
		idTipoGravame: param.idTipoGravame,
		idTipoOperacao: param.idTipoOperacao
	};
	model
		.getGravame()
		.findOne({
			where: condicao,
			raw: true
		})
		.then(function (result) {
			callback(null, result);
		})
		.catch(function (erro) {
			console.log('Erro no DAO', erro);
			connection.testConexao();
			callback(null, null);
		});
};

GravameDAO.prototype.incluir = function (param, callback) {
	log && logger.info('parametros recebidos para persistir: ', param);

	conexao = connection.getSequelize();
	conexao.transaction({
		autocommit: true
	}, function (t1) {
		return model
			.getGravame()
			.create(param, {
				transaction: t1
			})
			.then(function (resultado) {
				callback(null, resultado);
			})
			.catch(function (error) {
				logger.error(error);
				connection.testConexao();
				callback(error, null);
			});
	});
};

GravameDAO.prototype.salvar = (obj, transaction) => {
	if (transaction) return model.getGravame().create(obj, {
		transaction
	});
	else return model.getGravame().create(obj);
};

GravameDAO.prototype.buscarPorTipoGravameTipoOperacao = (idTipoGravame, idTipoOperacao) => {
	return model.getGravame().findOne({
		where: {
			idTipoGravame,
			idTipoOperacao
		}
	});
};

GravameDAO.prototype.alterar = function (param, callback) {
	log && logger.info('parametros recebidos para persistir: ', param);
	conexao = connection.getSequelize();
	conexao.transaction({
		autocommit: true
	}, function (t1) {
		return model
			.getGravame()
			.update(
				param, {
					where: {
						idGravame: param.idGravame
					}
				}, {
					transaction: t1
				}
			)
			.then(function (resultado) {
				if (resultado[0] > 0) {
					callback(null, new MensagemReturnDTO('Atualização realizada com sucesso.', 'Os dados recebidos foram atualizados.'));
				} else {
					callback(null, new MensagemReturnDTO('Atualização não realizada.', 'Não foi encontrado objeto com o parametro informado.'));
				}
			})
			.catch(function (error) {
				logger.error(error);
				connection.testConexao();
				callback(error, null);
			});
	});
};

GravameDAO.prototype.excluir = function (id, callback) {
	return model
		.getGravame()
		.destroy({
			where: {
				idGravame: id
			}
		})
		.then(function (rowDeleted) {
			if (rowDeleted > 0) {
				callback(null, new MensagemReturnDTO('Exclusão realizada com sucesso.', 'Objeto encontrado na base.'));
			} else {
				callback(null, new MensagemReturnDTO('Exclusão não realizada.', 'Não foi encontrado objeto com o parametro informado.'));
			}
		})
		.catch(function (error) {
			logger.error('erro ao deletar: ', error);
			callback(error, null);
		});
};

module.exports = GravameDAO;