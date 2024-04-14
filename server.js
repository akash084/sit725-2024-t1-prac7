let express = require("express");
const bodyParser = require("body-parser");
const app = express();

//Use this to prevent TypeError: Cannot read properties of undefined (reading '_id')
app.use(bodyParser.urlencoded({ extended: false }));

// Import routes
let projectsRoute = require("./routes/router");

// Use routes
app.use("/api", projectsRoute);

//Start the server
let port = process.env.port || 3000;

app.use(express.static(__dirname + "/"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.render("index.html");
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
