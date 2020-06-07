module.exports = function(app) {
	const controller = require('../controllers/ProjetoDockerController');

	app.get('/dados/', controller.getDados);
};
