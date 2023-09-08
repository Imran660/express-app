//import statement
const express = require("express");
const { getBodyDataLength } = require("./helper");
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
// server.use("/add-learner", (req, res, next) => {
//   const key = req.headers.secret_key;
//   if (key == process.env.SECRET_KEY) next();
//   else res.status(401).send(`Hey you're unauthorised to access this service`);
// });

const checkUser = (req, res, next) => {
  const key = req.headers.secret_key;
  if (key == process.env.SECRET_KEY) next();
  else res.status(401).send(`Hey you're unauthorised to access this service`);
};

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

server.post("/add-learner", checkUser, (req, res) => {
  //check first whether the incoming learner is already added or not
  if (!getBodyDataLength(req.body)) {
    res.status(400).send("please send the data in the body");
    return;
  }

  const { id, name } = req.body;

  const isLearnerExist = learners.find((elem, index) => elem.id == id);
  if (isLearnerExist) {
    res.status(400).send(`${name} is already exist`);
    return;
  }
  learners.push(req.body);
  res.status(201).send(`user ${name} added successfully`);
});

server.get("/all-learners", (req, res) => {
  res.json(learners);
});

server.put("/update-learner/:id", checkUser, (req, res) => {
  // first id from the params and second one is the content what we need to update from the body
  try {
    const { id } = req.params;
    const bodyLength = getBodyDataLength(req.body);
    if (!bodyLength) {
      res.status(400).send("please send the data in the body");
      return;
    }
    // first we need to find the learner by id
    const index = learners.findIndex((elem) => elem.id === parseInt(id));
    // once we found it then we update that learner
    if (index === -1) {
      if (bodyLength === 2) {
        learners.push({ id, ...req.body });
        res
          .status(201)
          .send(
            `hey ${req.body.name} doesn't found with the id, so added to the learners data`
          );
        return;
      }
      res.status(404).send(`user is not found with the id- ${id}`);
      return;
    }

    //updating part
    learners[index] = { ...learners[index], ...req.body };
    res.send(learners[index]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

server.delete("/delete-learner/:id", checkUser, (req, res) => {
  try {
    const { id } = req.params;
    const index = learners.findIndex((elem) => elem.id === parseInt(id));

    if (index == -1) {
      res.status(404).send(`Learner with id-${id} not found`);
      return;
    }

    learners.splice(index, 1);
    res.send(`learner with id-${id} got deleted`);

    // khushi's code
    // const updatedLearners = learners.filter(
    //   (learner) => learner.id !== parseInt(id)
    // );
    // if (updatedLearners.length == learners.length) {
    //   res.status(404).send(`Learner with id-${id} not found`);
    //   return;
    // }
    // if (updatedLearners.length < learners.length) {
    //   learners = updatedLearners;
    //   res.send(`learner with id-${id} got deleted`);
    // }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});



//server listen or start
server.listen(port, () => console.log(`server is running on the port ${port}`));
