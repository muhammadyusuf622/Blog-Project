const express = require("express")
const { getAlldata, createData, deleteData } = require("../controller/data.controller");
const { loginSetup } = require("../controller/user.controller");

const router = express.Router()

router.get("/", getAlldata);

router.post("/data", createData);

router.post("/dalete", deleteData)

router.post("/login", loginSetup);


module.exports = router; 