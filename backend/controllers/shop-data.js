const ShopData = require("../models/shop-data");

exports.getData = async (req, res, next) => {
  const dataType = req.params.dataType;

  let shopData = await ShopData.findAll({
    raw: true,
  });

  if (dataType === "chart") {
    shopData = shopData.map((somedata) => {
      somedata.date = new Date(somedata.date);

      return somedata;
    });

    const shopDataAggregatedByDates = {};
    shopData.map((someData) => {
      if (shopDataAggregatedByDates[someData.date]) {
        const shopDateByDate = shopDataAggregatedByDates[someData.date];

        shopDateByDate["product_views"] += someData["product_views"];
        shopDateByDate["revenue"] += someData["revenue"];
        shopDateByDate["units_sold"] += someData["units_sold"];
      } else {
        shopDataAggregatedByDates[someData.date] = {
          product_views: someData["product_views"],
          revenue: someData["revenue"],
          units_sold: someData["units_sold"],
        };
      }
    });

    return res.status(200).json(shopDataAggregatedByDates);
  }
};
