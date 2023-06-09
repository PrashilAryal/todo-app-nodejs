const express = require("express");
const router = express.Router();
const route = require("./auth.routes");

//export the router
module.exports = router;

router.get("/", (req, res) => {
  // return res.render("main");
  if (!req.session.isUserLoggedIn) {
    return res.redirect("/login");
  } else {
    req.conn.query("SELECT * FROM todo", (error, result) => {
      if (error) {
        res.status(500).send("Error while retrieving!");
      }
      res.render("todo", { items: result.rows });
    });
  }
});
// router.get("/todo/", (req, res) => {
// router.get("/todo", (req, res) => {
//   req.conn.query("SELECT * FROM todo", (error, result) => {
//     if (error) {
//       res.status(500).send("error");
//     }
//     console.log(result.rows);
//     res.render("index", { items: result.rows });
//   });
// });

// router.post("/todo/add-todo", (req, res) => {
router.post("/add-todo", (req, res) => {
  let addTodo = req.body.todo;
  req.conn.query(
    "insert into todo(id, title, isComplete) values ($1, $2, $3)",
    [Math.floor(Math.random(5) * 1000), addTodo, 0],
    (error, result) => {
      if (error) {
        res.status(500).send("Error while adding todo!");
      }
    }
  );
  res.redirect("/todo");
  // console.log(req.body);
  // const todo = {
  //   label: req.body.todo,
  //   completed: false,
  // };
  // todos.push(todo);

  //dai
  // return res.redirect("/todo");
});
// router.post("/todo/remove-todo", (req, res) => {
router.post("/remove-todo", (req, res) => {
  // // console.log(req.body.delete);
  // todos.splice(req.body.delete, 1);
  // res.redirect("/todo");

  // const id = parseInt(req.body.delete);
  const id = parseInt(req.body.id);
  req.conn.query("delete from todo where id = $1", [id], (error, result) => {
    if (error) {
      res.status(500).send({ message: "failed to remove todo" });
    }
  });
  res.redirect("/todo");
});

// router.post("/todo/task-completed", (req, res) => {
router.post("/task-completed", (req, res) => {
  const id = parseInt(req.body.id);
  const isCompleted = parseInt(req.body.isCompleted);

  req.conn.query(
    "update todo set isComplete= $1 where id = $2",
    [isCompleted, id],
    (error, result) => {
      if (error) {
        res.status(500).send({ message: "failed to update todo" });
      }
      return res.redirect("/todo");
    }
  );
});
