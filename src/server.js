const express = require("express");
const { APP_PORT } = require("./config/app.config");
const articleRouter = require("./routes/articles")
const { console } = require("inspector");
const createTable = require("./model/pg");
const errorMiddleware = require("./middleware/errorMiddleware");
const path = require("path")


const app = express();

createTable()
.then((data) => console.log(data))
.catch((err) => {
  console.error("Xatolik yuz berdi:", err.message);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use('/api',articleRouter)

app.all("/*", (req, res) => {
  res.status(404).send({
    message: `Given URL: ${req.url} is not found`,
  });
});

app.use(errorMiddleware);

app.listen(APP_PORT, () => {
  console.log(`http://localhost:${APP_PORT}`)
})