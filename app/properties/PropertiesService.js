
global.log4js = require("log4js");
global.log4js.configure("./config/log4js.json");
var jsonLayout = require("log4js-json-layout");
global.log4js.layouts.addLayout("json", jsonLayout);

const BUCKET = process.env.environment || process.env.ENVIRONMENT;

const listaChave = [{ chave: 'PropertiesDB', valor: 'base_dados' }];

function PropertiesService() { }

PropertiesService.prototype.init = function (callback) {

    if (!BUCKET) {
        throw new Error('environment not found');
    }
    // carregarProperties(listaChave, 0, function (erro, resultado) {
    //     global[listaChave[index].chave] = JSON.parse(resultado.Body)

    // });

}

function carregarProperties(listaChave, index, callback) {
    // if (resultado) {

    //     global[listaChave[index].chave] = JSON.parse(resultado.Body);

    //     if (listaChave.length > ++index) {

    //         carregarProperties(listaChave, index, function (erro, resultado) {
    //             if (resultado.index == listaChave.length) {
    //                 callback(null, resultado);

    //             } else {
    //                 callback(erro, null);

    //             }
    //         });

    //     } else {
    //         var ret = {}
    //         ret.index = index;
    //         ret.retorno = 'sucesso';
    //         callback(null, ret);
    //     }

    // } else {
    //     callback(erro, null);
    // }

}

module.exports = PropertiesService;

