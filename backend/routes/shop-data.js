const express = require("express");

const getDataController = require("../controllers/shop-data");

const router = express.Router();

router.get("/get_data/:dataType", getDataController.getData);

module.exports = router;
