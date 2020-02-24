// instatiate express module
const express = require("express");
require("express-group-routes");

//use express in app variable
const app = express();

//init bodyParser
const bodyParser = require("body-parser");

//define the server port
const port = 3200;

//allow this app to receive incoming json request
app.use(bodyParser.json());

//create the homepage root
app.get("/", (req, res) => {
  //res means response, and it send string "Hello Express!" to the API
  res.send("Hello Aziz Nur ABdul Qodir!");
});

//when this nodejs app executed, it will listen to defined port
// app.listen(port, () => console.log(`Listening on port ${port}!`))

//make hardcoded array of obj todos
//import the controller
// const TodosController = require("./controllers/todos");
const { authenticated } = require("./middleware");

const RegisController = require("./controllers/register");
const LoginController = require("./controllers/login");
const SpeciesController = require("./controllers/species");
const PetController = require("./controllers/pet");
const UserController = require("./controllers/user");

//GET list route: simply send arr of obj todos your user screen
app.group("/api/v1", router => {
  router.post("/login", LoginController.login);

  router.post("/register", RegisController.register);
  router.get("/species", authenticated, SpeciesController.species);
  router.post("/species", authenticated, SpeciesController.speciesadd);
  router.post("/pet", authenticated, PetController.Insert);
  router.get("/pet/:id", authenticated, PetController.getdetail);
  router.get("/pets", authenticated, PetController.Getpet);
  router.patch("/pet/:id", authenticated, PetController.Updatepet);
  router.delete("/pet/:id", authenticated, PetController.ilang);
  router.get("/user/:id", authenticated, UserController.getuser);
  router.patch("/user/:id", authenticated, UserController.updateuser);
  router.delete("/user/:id", authenticated, UserController.deleteuser);

  // router.get("/todos", authenticated, TodosController.index);

  // //GET detail route: receive json body request, from user input, then push to todos array
  // router.get("/todo/:id", authenticated, TodosController.show);

  // //POST route: receive json body request, from user input, then push to todos array
  // router.post("/todo", authenticated, TodosController.store);

  // //PATCH route: receive json body request, from user input, then push to todos array by obj id
  // router.put("/todo/:id", authenticated, TodosController.update);

  // //DELETE route: delete the todo obj, by received id request paramas
  // router.delete("/todo/:id", authenticated, TodosController.destroy);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
