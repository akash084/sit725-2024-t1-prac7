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

const getAllCats = async () => {
	try {
		const cats = await collection.find({}).toArray();
		return cats;
	} catch (err) {
		throw new Error("Error fetching cats");
	}
};

app.get("/api/cards", async (req, res) => {
	try {
		const result = await getAllCats();
		res.json({
			statusCode: 200,
			data: result,
			message: "get all the cards success",
		});
	} catch (err) {
		res.status(500).json({
			statusCode: 500,
			message: "Internal server error",
			error: err.message,
		});
	}
});

app.listen(port, () => {
	console.log("Express server started");
	runDBConnection();
});
