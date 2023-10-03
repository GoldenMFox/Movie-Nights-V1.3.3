const express = require("express");
const path = require("path");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const mysql = require("mysql");
const session = require("express-session");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");

const mysqlStore = require("express-mysql-session")(session);

const TWO_HOURS = 1000 * 60 * 60 * 2;
const IN_PROD = process.env.NODE_ENV === "production";

const options = {
  connectionLimit: 10,
  password: process.env.DB_PASS,
  user: process.env.DB_USER,
  database: process.env.MYSQL_DB,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  createDatabaseTable: true,
};

const pool = mysql.createPool(options);

const sessionStore = new mysqlStore(options, pool);

app.use(
  session({
    name: process.env.SESS_NAME,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    secret: process.env.SESS_SECRET,
    cookie: {
      maxAge: TWO_HOURS,
      sameSite: true,
      secure: IN_PROD,
    },
  })
);

const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/LoginPage.html");
  } else {
    next();
  }
};

const redirectUserPage = (req, res, next) => {
  if (req.session.userId) {
    res.redirect("/UserPage.html");
  } else {
    next();
  }
};

// Use the body-parser middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public", "css")));
app.use(express.static(path.join(__dirname, "public", "html")));
app.use(express.static(path.join(__dirname, "public", "images")));
app.use(express.static(path.join(__dirname, "public")));

// View Engine Setup
app.set("views", path.join(__dirname, "/views"));

app.set("view engine", "hbs");

app.get("/LoginPage.html", redirectUserPage, function (req, res) {
  res.render("LoginPage");
});

const fs = require("fs");

app.get("/index.html", redirectUserPage, function (req, res) {
  const movieContainerCreator = require("./public/js/movieContainerCreator");

  async function processGeneratedHTML(generatedHTMLArray) {
    // Check if the array is not empty before iterating
    if (generatedHTMLArray.length > 0) {
      // Using a forEach loop to iterate through the array
      generatedHTMLArray.forEach((generatedHTML) => {
        // Do something with each generated HTML
        console.log(generatedHTML);

        // You can manipulate the generatedHTML here as needed
      });
    } else {
      console.log("No generated HTML found.");
    }
  }



  async function main() {
    try {
      // Call getMovieHTMLArray to get the generated HTML array
      const generatedHTMLArray =
        await movieContainerCreator.getMovieHTMLArray();

      // Pass the generated HTML array to the processGeneratedHTML function
      await processGeneratedHTML(generatedHTMLArray);
      const username = "huila";
      res.render("index", { generatedHTMLArray, username });
    } catch (error) {
      // Handle any errors that might occur during file reading or processing
      console.error("Error:", error);
    }
  }

  main();



});

app.get("/UserPage.html", redirectLogin, async (req, res) => {
  const { userId } = req.session;
  console.log(userId);
  console.log(userId);
  console.log(userId);
  console.log(userId);
  console.log(userId);
  if (userId) {
    try {
      const db = require("./config/db_connection");
      const user = await db.getUser(userId);
      console.log(user);
      req.user = user;
      res.render("UserPage", { user: user[0].user_name });
    } catch (e) {
      console.log(e);
      res.sendStatus(404);
    }
  }
});

app.get("/Favorite.html", redirectLogin, function (req, res) {
  res.render("Favorite");
});

app.get("/RegisterForm.html", function (req, res) {
  res.render("RegisterForm");
});

app.get("/TierList.html", function (req, res) {
  res.render("TierList");
});
const User = require(path.join(__dirname, "public", "js", "user.js"));
//register
app.post("/user_form", async (req, res, next) => {
  var name = req.body.name;
  var last_name = req.body.last_name;
  var user_name = name.charAt(0) + last_name.charAt(0);
  user_name = user_name.toUpperCase();
  var email = req.body.email;
  var password = req.body.password;
  var confirm_password = req.body.confirm_password;

  const db = require("./config/db_connection");
  const user = await db.checkEmail(email);
  const salt = genSaltSync(10);
  password = hashSync(password, salt);

  if (user !== null) {
    var message = " already exists in the database";
    console.log(message);
    res.render("RegisterForm", { errorMessage: message });

    return;
  } else {
    // Email doesn't exist, proceed with the insertion

    //firstName, lastName, email,user_name, password

    //        TASK  - make to create a session directly for the  user
    const user = await db.insertUser(
      name,
      last_name,
      email,
      user_name,
      password
    );

    res.render("UserPage");
  }
});

app.post("/login_form", redirectUserPage, async (req, res, next) => {
  try {
    const email = req.body.email;
    console.log(email);
    let password = req.body.password;

    const db = require("./config/db_connection");
    const user = await db.getUserByEmail(email);

    if (!user) {
      console.log(user);
      return res.send({
        message: "Invalid email or password",
      });
    }

    const isValidPassword = compareSync(password, user.PASSWORD);
    if (isValidPassword) {
      user.password = undefined;
      req.session.userId = user.id;
      return res.redirect("/UserPage.html");
    } else {
      res.send("Invalid email or password");
      return res.redirect("/LoginPage.html");
    }
  } catch (e) {
    console.log(e);
  }
});

app.post("/logout", redirectLogin, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/UserPage.html");
    }
    sessionStore.close();
    res.clearCookie(process.env.SESS_NAME);
    res.redirect("/LoginPage.html");
  });
});

app.listen(process.env.PORT || 5500, () => {
  console.log("Server running on port 5500");
});
