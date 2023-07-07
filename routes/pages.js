const express = require("express");
const loggedIn = require("../controllers/loggedIn");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/registration", (req, res) => {
  res.sendFile("registration.html", { root: "./public" });
});

router.get("/loginPage", (req, res) => {
  res.sendFile("loginPage.html", { root: "./public" });
});

module.exports = router;
