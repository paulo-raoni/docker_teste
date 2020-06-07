var Sequelize = require("sequelize");
var sequelize = new Sequelize();
var jaConectou = false;
var log4js = require('log4js')
var logger = log4js.getLogger("infra");
log4js.configure('./config/log4js.json');

module.exports.getSequelize = function () {

  if (global.PropertiesDB) {
    if (!jaConectou) {
      jaConectou = true;
      sequelize = new Sequelize(global.PropertiesDB.dbName, global.PropertiesDB.dbUser, global.PropertiesDB.dbPassword, {
        host: global.PropertiesDB.dbHost,
        port: global.PropertiesDB.dbPort,
        timezone: "-03:00",
        dialect: global.PropertiesDB.dbDialect.toString(),
        logging: global.PropertiesAWS.dbLog ? logger.info : false,
        benchmark: global.PropertiesAWS.dbLog,
      });
    }
  }
  return sequelize;
}

module.exports.testConexao = function () {
  sequelize
    .authenticate()
    .then(function (err) {
      global.PropertiesAWS.dbLog && logger.info('A conexão foi estabelecida com êxito.');
    })
    .catch(function (err) {
      logger.error('Não foi possível conectar ao banco de dados:', err.message);
      logger.error('** Servidor parado! **');
      process.exit();
    });
}