// const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
	"mongodb+srv://akashbaniya084:DM5lOlHA5eEl94Bd@cluster0.4edcxj4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function run() {
	try {
		await client.connect();
		await client.db("admin").command({ ping: 1 });
		console.log(
			"Pinged your deployment. You successfully connected to MongoDB!"
		);
	} finally {
		await client.close();
	}
}

async function postCard(card) {
	await client.connect();
	let collection = await client.db().collection("Cat");
	return collection.insertOne(card);
}

async function getAllCards() {
	await client.connect();
	let collection = await client.db().collection("Cat");
	return collection.find().toArray();
}

module.exports = {
	run,
	postCard,
	getAllCards,
	client,
};
