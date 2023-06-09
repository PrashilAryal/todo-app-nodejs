const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.conn);
  res.render("main");
});

router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", (req, res) => {
  console.log(req.body);
  const username = req.body.userName;
  const password = req.body.userPassword;
  if (username === "" || password === "") {
    return res.redirect("/login");
  }
  req.conn.query(
    "SELECT * FROM users WHERE userName = $1 AND userPassword = $2",
    [username, password],
    (error, result) => {
      if (error) {
        res.status(500).send({ message: "Error during logging in!" });
        return res.redirect("/login");
      } else {
        if (result.rows.length === 0) {
          return res.redirect("/login");
        }
        req.session.isUserLoggedIn = true;
        return res.redirect("/todo");
      }
    }
  );
  // if (req.body.userName === "KingWiz" && req.body.userPassword === "1234") {
  //   console.log("Yes, you are logged in");
  //   req.session.isUserLoggedIn = true;
  //   return res.redirect("/dashboard");
  // } else {
  //   console.log("username or password didn't match");
  //   return res.redirect("/login");
  // }
});
// app.get("/index", (req, res) => {
//   if (!req.session.isUserLoggedIn) {
//     return res.redirect("/login");
//   }
//   console.log(req.session);
//   res.render("index");
// });
router.get("/logout", (req, res) => {
  req.session.destroy();
  return res.redirect("/login");
});

module.exports = router;
