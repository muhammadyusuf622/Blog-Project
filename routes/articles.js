const express = require("express")
const ForFiles = require("../helpers/function");
const path = require("node:path");
const { getAlldata, putData, deleteData } = require("../controller/data.controller");
const { loginSetup } = require("../controller/user.controller");

const dataPath = path.join(__dirname, "..", "data", "data.json")
const userPath = path.join(__dirname, "..", "data", "user.json")


const router = express.Router()
const forDataFile = new ForFiles(dataPath);
const forUserFile = new ForFiles(userPath);


router.get("/", getAlldata);

router.post("/api/data", putData);

router.post("/api/dalete", deleteData)

router.post("/api/login", loginSetup);


module.exports = router; 