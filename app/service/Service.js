var request = require('request');
var log4js = require('log4js');
var logger = log4js.getLogger("[Service]");
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


module.exports = Service;