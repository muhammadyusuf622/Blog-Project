const express = require("express");
const { APP_PORT } = require("./config/app.config");
const articleRouter = require("./routes/articles")
const { console } = require("inspector");


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

app.use('/',articleRouter)


app.listen(APP_PORT, () => {
  console.log(`http://localhost:${APP_PORT}`)
})