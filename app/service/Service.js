var request = require('request');
var log4js = require('log4js');
var logger = log4js.getLogger("[service]");
log4js.configure('./config/log4js.json');


function Service() {

};

Service.prototype.trazerDados = param => {
    return new Promise((resolve, reject) => {
        const url = `url://`;
        request({
            url: url,
            method: 'GET'
        }, function (error, response, body) {
            if (error) {
                reject(error);
            } else {
                if (response.statusCode == 200) {
                    resolve(JSON.parse(body));
                } else {
                    reject(body);
                }
            }
        });
    })

}

Service.prototype.notificarPagamento = function (param, callback) {
    var url = global.PropertiesAWS.notificarPagamento;
    obj = {};
    obj.bloqueio = {};
    obj.bloqueio.objeto = param.objeto;
    request({
        headers: {
            "x-action": "bloqueio"
        },
        url: url,
        method: 'PATCH',
        json: obj

    }, function (error, response, body) {
        if (error) {
            callback(error, null);
        } else {
            if (response.statusCode == 200) {
                callback(null, body);
            } else {
                callback(null, null);
            }
        }
    });
}

Service.prototype.desbloqueioPagamento = function (param, callback) {
    var url = global.PropertiesAWS.notificarPagamento;
    obj = {};
    obj.desbloqueio = {};
    obj.desbloqueio.idPagamento = param.idPagamento;
    request({
        headers: {
            "x-action": "desbloqueio"
        },
        url: url,
        method: 'PATCH',
        json: obj

    }, function (error, response, body) {
        if (error) {
            callback(error, null);
        } else {
            if (response.statusCode == 200) {
                callback(null, body);
            } else {
                callback(true, null);
            }
        }
    });
}

Service.prototype.obterTitulosPorNumero = function (param) {

    var url = global.PropertiesAWS.obterTitulosPorNumero + param.numTitulo + '/' + param.serie;
    if (param.plano != null || param.plano != undefined) {
        url = url + '/' + param.plano.replace(/['"]+/g, '');
    }
    logger.trace("url obterTitulosPorNumero: ", url);
    request({
        url: url,
        method: 'GET'
    }, function (error, response, body) {
        if (error) {
            callback(error, null);
        } else {
            if (response.statusCode == 200) {
                callback(null, JSON.parse(body));
            } else {
                callback(true, null);
            }

        }
    });
}

Service.prototype.buscaTituloPorCpf = function (params, callback) {
    let url = `https://apis-dev.brasilcap.info/titulos/titulos/parceiros/0/${params.cpf}/1?posVenda=1&tipoPessoa=PF&idFamiliaProduto=1`;

    // return new Promise(async (resolve, reject) => {

    this.get(url, (error, response) => {
        if (response) {
            // result = JSON.parse(response);
            callback(null, response);
            // resolve(result.listaTitulos);
        }
        else {
            callback(error, null);
            // reject('Título(s) não encontrado(s) com CPF informado ', erro);
        }
    })
    // });
}

Service.prototype.getSolicitacoesObitoByIdTitulo = function (idTitulo) {
    return new Promise((resolve, reject) => {
        const url = `${global.PropertiesAWS.getSolicitacoes}?x_action=informeObitos&idTitulo=${idTitulo}`;
        
        request({
            url: url,
            method: 'GET'
        }, function (error, response, body) {
            if (error) {
                reject(error);
            } else {
                if (response.statusCode == 200) {
                    resolve(JSON.parse(body));
                } else {
                    resolve(null);
                }
            }
        });
    })
}

Service.prototype.get = function (urlParam, callback) {
    logger.debug('urlParam: ', urlParam);
    request(
        {
            url: urlParam,
            method: 'GET'
        },
        (error, response) => {
            //tratarRetorno(error, response, urlParam, callback);
            if (error) {
                callback(error, null);
            } else {
                callback(null, response.body);
            }
        }
    );
};


module.exports = Service;