const moment = require('moment');
var log4js = require('log4js');
var logger = log4js.getLogger('[ProjetoDockerController]');
log4js.configure('./config/log4js.json');


exports.getDados = (req, res) => {
	const tweets = [
		{nomeTweet: "nome1", hashTag: "#nome"},
		{nomeTweet: "nome2", hashTag: "#nome"},
		{nomeTweet: "carro1", hashTag: "#carro"},
		{nomeTweet: "carro2", hashTag: "#carro"},
		{nomeTweet: "culinaria1", hashTag: "#culinaria"},
		{nomeTweet: "culinaria2", hashTag: "#culinaria"},
		{nomeTweet: "culinaria3", hashTag: "#culinaria"}
	];

	const hashTagList = tweets.map(el => {
		return {
			hashTag: el.hashTag
		}
	});

	const valoresHashTagList = hashTagList.map(el => {
		const valorHashTag = Object.values(el);
		return valorHashTag;
	});

	const valoresHashTagUnicos = [...new Set(valoresHashTagList)];
	const tweetsAgrupados = {};
	valoresHashTagUnicos.forEach(valorHashTag => {
		tweetsAgrupados[valorHashTag] = [];
		tweets.forEach(tweet => {
			if(tweet.hashTag == valorHashTag) {
				tweetsAgrupados[valorHashTag].push({nomeTweet: tweet.nomeTweet, hashTag: tweet.hashTag});
			}
		});
	});

	console.log(hashTagList);
	console.log(valoresHashTagUnicos);
	console.log(tweetsAgrupados);

	
	
	return res.status(200).send(tweets);
};

