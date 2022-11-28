const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes, Model } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected");
  })
  .catch((e) => console.log("Error: ", e));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require("./productmodal.js")(sequelize, DataTypes);
db.reviews = require("./reviewmodal.js")(sequelize, DataTypes);
db.user = require("./user.js")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("Re-sync done");
});

// 1 to many relation implementation

db.products.hasMany(db.reviews, {
  foreignKey: "product_id",
  as: "review",
});

db.reviews.belongsTo(db.products, {
  foreignKey: "product_id",
  as: "product",
});

module.exports = db;
