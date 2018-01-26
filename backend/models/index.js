const Sequelize = require("sequelize");

const scheme = require("./scheme");

const Op = Sequelize.Op;

// Здесь была ошибка, забыли передать аргумент
const sequelize = new Sequelize(null, null, null, {
  dialect: "sqlite",
  storage: "db.sqlite3",

  operatorsAliases: { $and: Op.and },

  logging: false,
});


scheme(sequelize);
sequelize.sync();

module.exports.sequelize = sequelize;
module.exports.models = sequelize.models;
