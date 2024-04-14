let express = require("express");
let app = express();
let port = process.env.port || 3000;
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

app.use(express.static(__dirname + "/"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.render("index.html");
});

app.post("/api/cat", async (req, res) => {
	let cat = req.body;
	let result = await postCat(cat);
	client.close();
	res.json({ statusCode: 201, message: "success", data: result });
});

async function postCat(cat) {
	await client.connect();
	let collection = await client.db().collection("Cat");
	return collection.insertOne(cat);
}

app.get("/api/cats", async (req, res) => {
	let result = await getAllCats();
	client.close();
	res.json({ statusCode: 201, message: "success", data: result });
});

async function getAllCats() {
	await client.connect();
	let collection = await client.db().collection("Cat");
	return collection.find().toArray();
}

app.listen(port, () => {
	console.log("server started");
	//run().catch(console.dir);;
});

// const express = require("express");
// const { MongoClient } = require("mongodb");
// const app = express();
// const uri =
// 	"mongodb+srv://akashbaniya084:DM5lOlHA5eEl94Bd@cluster0.4edcxj4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const port = process.env.PORT || 3000;
// let collection;

// app.use(express.static(__dirname + "/"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// const client = new MongoClient(uri, {
// 	serverApi: {
// 		version: "1",
// 		strict: true,
// 		deprecationErrors: true,
// 	},
// });

// async function runDBConnection() {
// 	try {
// 		await client.connect();
// 		collection = client.db().collection("Cat");
// 		console.log(collection);
// 	} catch (ex) {
// 		console.error(ex);
// 	}
// }

// app.get("/", (req, res) => {
// 	res.sendFile(__dirname + "/index.html");
// });

// app.post("/api/postCard", async (req, res) => {
// 	let card = req.body;
// 	let result = await postCat(card);
// 	client.close();
// 	res.json({ statusCode: 201, message: "success", data: result });
// });

// async function postCat(card) {
// 	await client.connect();
// 	let collection = await client.db().collection("Cat");
// 	return collection.insertOne(card);
// }

// const getAllCats = async () => {
// 	try {
// 		const cats = await collection.find({}).toArray();
// 		return cats;
// 	} catch (err) {
// 		throw new Error("Error fetching cats");
// 	}
// };

// // app.get("/api/cards", async (req, res) => {
// // 	try {
// // 		const result = await getAllCats();
// // 		client.close();
// // 		res.json({
// // 			statusCode: 200,
// // 			data: result,
// // 			message: "get all the cards success",
// // 		});
// // 	} catch (err) {
// // 		res.status(500).json({
// // 			statusCode: 500,
// // 			message: "Internal server error",
// // 			error: err.message,
// // 		});
// // 	}
// // });

// app.get("/api/cards", async (req, res) => {
// 	let result = await getAllCats();
// 	client.close();
// 	res.json({ statusCode: 200, message: "success", data: result });
// });

// // const postCard = (formData) => {
// // 	console.log(formData);
// // };

// // app.get("/", (req, res) => {
// // 	if (req.statusCode == 200) {
// // 		console.log("success Hurray");
// // 	}
// // });

// app.listen(port, () => {
// 	console.log("Express server started");
// 	runDBConnection();
// });

// module.exports = { postCard };
