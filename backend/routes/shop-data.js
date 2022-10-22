const express = require("express");

const getDataController = require("../controllers/shop-data");

const router = express.Router();

router.get("/get_data_chart", getDataController.getDataChart);
router.get("/get_data_table", getDataController.getDataTable);

module.exports = router;
