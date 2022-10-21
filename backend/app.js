const express = require("express");

const { readCSVFile } = require("./utils/read-csv-file");
const sequelize = require("./utils/database");
const ShopData = require("./models/shop-data");

const app = express();

const getDataRoutes = require("./routes/shop-data");
app.use("/api", getDataRoutes);

const csvData = readCSVFile();

const syncFunc = async () => {
  try {
    await sequelize.sync();

    for (let i = 0; i < csvData.length; i++) {
      const someData = csvData[i];
      await ShopData.create({
        category_name: someData[0],
        date: someData[1],
        product_views: someData[2],
        revenue: someData[3],
        units_sold: someData[4],
      });
    }

    // app start configuration
    const PORT = process.env.PORT || 8080;

    app.listen(PORT, function () {
      console.log("Running on port " + PORT);
    });
  } catch (error) {
    console.log("error :>> ", error);
  }
};

syncFunc();
