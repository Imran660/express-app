//import statement
const express = require("express");
require("dotenv").config();

//config
// picking the available port from the current environment if it's there then it will use that otherwise it will go for 5000
const port = process.env.PORT || 5000;
const learners = [
  { id: 1, name: "farman", address: "bangalore" },
  { id: 2, name: "Dwaraka", address: "hydrabad" },
  { id: 3, name: "faizan", address: "rajasthan" },
];

//server init or creating express object
const server = express();

//server middlewares
server.use(express.json());

//server routes or api or service
server.get("/", (req, res) => {
  // req, res are global object which we can use across our code
  res.send("Hello users, welcome to our backend services..");
});

server.get("/user", (req, res) => {
  res.send("hi user imran");
});

server.get("/user/:name", (req, res) => {
  console.log(req.params);
  res.send(`Hey user ${req.params.name}`);
});

server.get("/userDetails", (req, res) => {
  console.log(req.query);
  // res.send(req.query)
  // res.send("sending again")
  // console.log("executed")
  res.send(`here is the user details ${JSON.stringify(req.query)}`);
});

server.post("/add-learner", (req, res) => {
  //check first whether the incoming learner is already added or not
  const { id, name } = req.body;
  const isLearnerExist = learners.find((elem, index) => elem.id == id);
  console.log(isLearnerExist);
  if (isLearnerExist) {
    res.status(400).send(`${name} is already exist`);
    return;
  }
  console.log("executed");
  learners.push(req.body);
  res.status(201).send(`user ${name} added successfully`);
});

server.get("/all-learners", (req, res) => {
  res.json(learners);
});

//server listen or start
server.listen(port, () => console.log(`server is running on the port ${port}`));
