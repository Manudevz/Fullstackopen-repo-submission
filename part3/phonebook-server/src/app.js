const express = require("express");
const morgan = require("morgan");
let dataPersons = require("./dataPersons");
const templateString = require("./datainfoTime");

const app = express();
app.use(express.json());
morgan.token("req-body", (req) => {
	return req.method === "POST" ? JSON.stringify(req.body) : "";
});
//  also can add :user-agent -  and others
const customFormat =
	":method :url :status :res[content-length] - :response-time ms :req-body";
app.use(morgan(customFormat));

const PORT = "3001";

// START PAGE
app.get("/", (req, res) => {
	res.send("hola mundo");
});

// ALL PERSONS LISTED
app.get("/persons", (req, res) => {
	res.json(dataPersons);
});

// AN SPECIFIED PERSON LISTED
app.get("/persons/:id", (req, res) => {
	const id = req.params.id;
	const personGet = dataPersons.find((el) => el.id === parseInt(id));
	if (!personGet) {
		return res.status(404).send("papi, person not found");
	}
	res.send(personGet);
});

// AN SPECIFIED PERSON DELETED
app.delete("/persons/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const personDeleted = dataPersons.find((el) => el.id === id);

	console.log("Person to delete:", personDeleted);

	if (personDeleted) {
		dataPersons = dataPersons.filter((el) => el.id !== id);
		res.status(204).end();
	} else {
		res.status(404).send("papi, person not found");
	}
});

// AN SPECIFIED PERSON DELETED
app.post("/persons/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const personDeleted = dataPersons.find((el) => el.id === id);

	console.log("Person to delete:", personDeleted);

	if (personDeleted) {
		dataPersons = dataPersons.filter((el) => el.id !== id);
		res.status(204).end();
	} else {
		res.status(404).send("papi, person not found");
	}
});

// AN SPECIFIED NEW PERSON ADDED
app.post("/persons", (req, response) => {
	const body = req.body;
	const isNameRegistered = dataPersons.find((el) => el.name === body.name);

	if (!body.name) {
		return response.status(400).json({ error: "name is missing" });
	} else if (!body.number) {
		return response.status(400).json({ error: "number is missing" });
	} else if (isNameRegistered) {
		return response.status(400).json({ error: "name must be unique" });
	}
	const person = {
		name: body.name,
		number: body.number,
		id: Math.random() * 1000000,
	};

	dataPersons = dataPersons.concat(person);

	response.json(person);
});

// INFO
app.get("/info", (req, res) => {
	const infoDateDataToSend = templateString();
	res.send(
		`<p>PhoneBook has info for ${dataPersons.length} people</p> 
    <p>${infoDateDataToSend}</p>`
	);
});

app.listen(PORT);
console.log(`server started at ${PORT}`);
