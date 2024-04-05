// var express = require("express");
// var app = express();
// app.use(express.static(__dirname + "/"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// const cardList = [
// 	{
// 		title: "Kitten 2",
// 		image: "images/kitten.jpg",
// 		link: "About Kitten 2",
// 		desciption: "Demo desciption about kitten 2",
// 	},
// 	{
// 		title: "Kitten 3",
// 		image: "images/kitten.jpg",
// 		link: "About Kitten 3",
// 		desciption: "Demo desciption about kitten 3",
// 	},
// ];
// app.get("/api/projects", (req, res) => {
// 	res.json({ statusCode: 200, data: cardList, message: "Success" });
// });
// var port = process.env.port || 3000;
// app.listen(port, () => {
// 	console.log("App listening to: " + port);
// });

// var express = require("express");
// const { MongoClient, ServerApiVersion } = require("mongodb");
// var app = express();
// const uri =
// 	"mongodb+srv://akashbaniya084:DM5lOlHA5eEl94Bd@cluster0.4edcxj4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// var port = process.env.port || 3000;
// let collection;

// app.use(express.static(__dirname + "/"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// //*update your server.js
// // Create a Mongoclient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
// 	serverApi: {
// 		version: ServerApiVersion.v1,
// 		strict: true,
// 		deprecationerrors: true,
// 	},
// });
// async function runDBConnection() {
// 	try {
// 		// Connect the client to the server (optional starting in V4.7)
// 		await client.connect();
// 		collection = client.db().collection("Cat");
// 		console.log(collection);
// 	} catch (ex) {
// 		console.error(ex);
// 	}
// }
// app.get("/", (req, res) => {
// 	res.render("index.html");
// });

// const getAllCats = () => {
// 	$.get("/api/cards", (response) => {
// 		if (response.statusCode === 200) {
// 			addCards(response.data);
// 		}
// 	});
// };

// app.get("/api/cards", (req, res) => {
// 	getAllCats((err, result) => {
// 		if (!err) {
// 			res.json({
// 				statusCode: 200,
// 				data: result,
// 				message: "get all the cards success",
// 			});
// 		}
// 	});
// });

// app.listen(port, () => {
// 	console.log("express server started");
// 	runDBConnection();
// });

const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const uri =
	"mongodb+srv://akashbaniya084:DM5lOlHA5eEl94Bd@cluster0.4edcxj4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const port = process.env.PORT || 3000;
let collection;

app.use(express.static(__dirname + "/"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const client = new MongoClient(uri, {
	serverApi: {
		version: "1",
		strict: true,
		deprecationErrors: true,
	},
});

async function runDBConnection() {
	try {
		await client.connect();
		collection = client.db().collection("Cat");
		console.log(collection);
	} catch (ex) {
		console.error(ex);
	}
}

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

app.get("/api/projects", (req, res) => {
	getAllCats((err, result) => {
		if (!err) {
			res.json({
				statusCode: 200,
				data: result,
				message: "get all cards success",
			});
		}
	});
});

app.listen(port, () => {
	console.log("Express server started");
	runDBConnection();
});
