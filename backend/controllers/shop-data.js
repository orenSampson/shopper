const ShopData = require("../models/shop-data");

exports.getDataChart = async (req, res, next) => {
  let shopData = await ShopData.findAll({
    raw: true,
  });

  shopData = shopData.map((somedata) => {
    somedata.date = new Date(somedata.date);

    return somedata;
  });

  const shopDataAggregatedByDate = {};
  shopData.map((someData) => {
    if (shopDataAggregatedByDate[someData.date]) {
      const shopDateByDate = shopDataAggregatedByDate[someData.date];

      shopDateByDate["product_views"] += someData["product_views"];
      shopDateByDate["revenue"] += someData["revenue"];
      shopDateByDate["units_sold"] += someData["units_sold"];
    } else {
      shopDataAggregatedByDate[someData.date] = {
        product_views: someData["product_views"],
        revenue: someData["revenue"],
        units_sold: someData["units_sold"],
      };
    }
  });

  const dataArr = [];
  for (const key in shopDataAggregatedByDate) {
    if (Object.hasOwnProperty.call(shopDataAggregatedByDate, key)) {
      dataArr.push({
        date: key,
        ...shopDataAggregatedByDate[key],
      });
    }
  }

  dataArr.sort((a, b) => new Date(a.date) - new Date(b.date));

  return res.status(200).json(dataArr);
};

exports.getDataTable = async (req, res, next) => {
  let shopData = await ShopData.findAll({
    raw: true,
  });

  shopData = shopData.map((somedata) => {
    somedata.date = new Date(somedata.date);

    return somedata;
  });

  const shopDataAggregatedByCategory = {};
  const shopDataDividedByCategory = {};
  shopData.map((someData) => {
    if (shopDataAggregatedByCategory[someData.category_name]) {
      const shopDataByCategory =
        shopDataAggregatedByCategory[someData.category_name];

      shopDataByCategory["product_views"] += someData["product_views"];
      shopDataByCategory["revenue"] += someData["revenue"];
      shopDataByCategory["units_sold"] += someData["units_sold"];
    } else {
      shopDataAggregatedByCategory[someData.category_name] = {
        product_views: someData["product_views"],
        revenue: someData["revenue"],
        units_sold: someData["units_sold"],
      };
    }

    if (!shopDataDividedByCategory[someData.category_name]) {
      shopDataDividedByCategory[someData.category_name] = [];
    }

    shopDataDividedByCategory[someData.category_name].push({
      date: someData["date"],
      product_views: someData["product_views"],
      revenue: someData["revenue"],
      units_sold: someData["units_sold"],
    });
  });

  for (const category in shopDataDividedByCategory) {
    if (Object.hasOwnProperty.call(shopDataDividedByCategory, category)) {
      const dataArrByCategory = shopDataDividedByCategory[category];

      const minDate = dataArrByCategory.reduce(function (a, b) {
        return a.date < b.date ? a : b;
      });
      const maxDate = dataArrByCategory.reduce(function (a, b) {
        return a.date > b.date ? a : b;
      });

      dataByCategory = shopDataAggregatedByCategory[category];

      dataByCategory["product_views_change"] = Math.round(
        ((maxDate["product_views"] - minDate["product_views"]) /
          minDate["product_views"]) *
          100
      );

      dataByCategory["revenue_change"] = Math.round(
        ((maxDate["revenue"] - minDate["revenue"]) / minDate["revenue"]) * 100
      );

      dataByCategory["units_sold_change"] = Math.round(
        ((maxDate["units_sold"] - minDate["units_sold"]) /
          minDate["units_sold"]) *
          100
      );
    }
  }

  let dataArr = [];
  for (const key in shopDataAggregatedByCategory) {
    if (Object.hasOwnProperty.call(shopDataAggregatedByCategory, key)) {
      dataArr.push({
        category_name: key,
        ...shopDataAggregatedByCategory[key],
      });
    }
  }

  dataArr = dataArr.map((someDataArr) => {
    someDataArr.cvr = Math.ceil(
      (someDataArr["units_sold"] / someDataArr["product_views"]).toFixed(2) *
        100
    );

    return someDataArr;
  });

  console.log("dataArr :>> ", dataArr);

  return res.status(200).json(dataArr);
};
