//require
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

//init
// dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const APP_PORT = process.env.PORT || 3000;

//routes
let todos = [
  { label: "Go to college", completed: false },
  { label: "Cook your food", completed: false },
];
app.get("/", (req, res) => {
  res.render("index", { items: todos });
});

app.post("/add-todo", (req, res) => {
  console.log(req.body);
  const todo = {
    label: req.body.todo,
    completed: false,
  };
  todos.push(todo);
  res.redirect("/");
});
app.post("/remove-todo", (req, res) => {
  // console.log(req.body.delete);
  todos.splice(req.body.delete, 1);
  res.redirect("/");
});
app.post("/task-completed", (req, res) => {
  const id = parseInt(req.body.id);
  todos[id].completed = !todos[id].completed;
  res.redirect("/");
});

//server activation
app.listen(APP_PORT, () => {
  console.log("server is running in port " + APP_PORT);
});
