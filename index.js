require("dotenv");

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/found", (req, res) => {
  res.send("Hello Worlddd");
});

app.get("/fin-all", (req, res) => {
  res.send("Hello final test Success");
});

app.get("/fin-all", (req, res) => {
  res.send("Hello final test Success");
});

app.get("/test-final", (req, res) => {
  res.send("Ready to test kubernetes");
});

app.get("/test-kub", (req, res) => {
  res.send("kubernetes running");
});

app.listen(process.env.PROD_PORT, () => {
  console.log("process.env.PROD_PORT");
});
module.exports = app;
