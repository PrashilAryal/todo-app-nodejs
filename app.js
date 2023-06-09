//require
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const getConnection = require("./config/db");
const todoRoutes = require("./routes/todo.routes");
const authRoutes = require("./routes/auth.routes");
const helmet = require("helmet");
const session = require("express-session");

//init
dotenv.config();
const app = express();
app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const APP_PORT = process.env.PORT || 8000;
const conn = getConnection();

app.use(
  session({
    name: "Todo Application Session",
    resave: false,
    saveUninitialized: true,
    secret: "this-is-very-secret",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      // secure: true, //for production we use this also (fro https request only)
    },
  })
);

//middleware
app.use("/", (req, res, next) => {
  req.conn = conn;
  next(); //to continue other code after middleware
  // res.end("this is over"); //to end this middleware
});

//routes
// let todos = [
//   { label: "Go to college", completed: false },
//   { label: "Cook your food", completed: false },
// ];

app.use("/todo", todoRoutes);
app.use("/", authRoutes);

//server activation
app.listen(APP_PORT, () => {
  console.log("server is running in port " + APP_PORT);
});
