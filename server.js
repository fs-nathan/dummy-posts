const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();

const USERS_FILE = path.join(__dirname, "data/users.json");
const POSTS_FILE = path.join(__dirname, "data/posts.json");

app.set("port", process.env.PORT || 3001);

app.use("/", express.static(path.join(__dirname, "build")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

/** API */
/** End of API */

/** Fallback all mismatched routes */
app.all("*", function (req, res) {
  res.redirect("/");
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
