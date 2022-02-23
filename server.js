const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");
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

app.post("/login", (req, res) => {
  fs.readFile(USERS_FILE, (err, data) => {
    const users = JSON.parse(data);
    const info = {
      username: req.body.username,
      password: req.body.password,
    };
    const found = users.filter(
      (user) => user.username == info.username && user.password == info.password
    ); // password should be encrypted but in this demo we treat password as string to save time overall
    res.setHeader("Cache-Control", "no-cache");
    if (!found.length) {
      res.send(401, {
        message: "Tên người dùng hoặc mật khẩu không chính xác",
      });
    } else {
      res.json(200, found[0]);
    }
  });
});

/** Get list posts */
app.get("/api/posts", (req, res) => {
  fs.readFile(POSTS_FILE, (err, data) => {
    const token = getTokenFromHeader(req);
    let posts = JSON.parse(data);
    posts = posts.filter((post) => post.ownerId === token);
    res.setHeader("Cache-Control", "no-cache");
    res.json(posts);
  });
});

/** Create new post */
app.post("/api/posts", (req, res) => {
  fs.readFile(POSTS_FILE, (err, data) => {
    const token = getTokenFromHeader(req);
    const posts = JSON.parse(data);
    const newPost = {
      title: req.body.title,
      ownerId: token,
      id: uuidv4(),
    };
    posts.push(newPost);
    fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 4), () => {
      res.setHeader("Cache-Control", "no-cache");
      res.json(posts);
    });
  });
});

/** Update post */
app.put("/api/posts", (req, res) => {
  fs.readFile(POSTS_FILE, (err, data) => {
    const token = getTokenFromHeader(req);
    let posts = JSON.parse(data);
    posts.forEach((post) => {
      if (post.ownerId === token && post.id === req.body.id) {
        post.title = req.body.title;
      }
    });
    fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 4), () => {
      res.json({});
    });
  });
});

app.delete("/api/posts", (req, res) => {
  fs.readFile(POSTS_FILE, (err, data) => {
    const token = getTokenFromHeader(req);
    let posts = JSON.parse(data);
    posts = posts.reduce((memo, post) => {
      if (post.ownerId === token && post.id === req.body.id) {
        return memo;
      } else {
        return memo.concat(post);
      }
    }, []);
    fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 4), () => {
      res.json({});
    });
  });
});
/** End of API */

/** Fallback all mismatched routes */
app.all("*", function (req, res) {
  res.redirect("/");
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});

/** Utils */
const getTokenFromHeader = (req) => {
  console.log(req.get("Authorization"));
  return req.get("Authorization");
};
