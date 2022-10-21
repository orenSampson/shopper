const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const ShopData = sequelize.define("shopData", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  category_name: Sequelize.STRING,
  date: Sequelize.DATE,
  product_views: Sequelize.INTEGER,
  revenue: Sequelize.INTEGER,
  units_sold: Sequelize.INTEGER,
});

module.exports = ShopData;
