const MongoDBData = require("../models/model");

const createCard = async (req, res) => {
	let card = req.body;
	let result = await MongoDBData.postCard(card);
	MongoDBData.client.close();
	res.json({ statusCode: 201, message: "success", data: result });
};

const getCards = async (req, res) => {
	let result = await MongoDBData.getAllCards();
	MongoDBData.client.close();
	res.json({ statusCode: 201, message: "success", data: result });
};

module.exports = {
	createCard,
	getCards,
};
