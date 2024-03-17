let express = require("express");
let app = express();
let port = 3000;

app.use(express.static(__dirname + "/"));
app.get("/", (req, res) => {
	res.render("index.html");
});

app.get("/addTwoNumbers", (req, res) => {
	// 1 gram the values from url parameter
	let value1 = req.query.num1;
	let value2 = req.query.num2;

	// 2 calculation
	let result = parseInt(value1) + parseInt(value2);

	// 3 returen the response, the response has to be in an object
	let response = { data: result, statusCode: 200, message: "success" };
	res.json(response);
});
app.listen(port, () => {
	console.log("server started!");
});
