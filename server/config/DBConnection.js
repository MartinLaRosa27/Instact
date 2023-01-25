require("../models/User");
require("../models/Publication");
require("../models/Tracing");
require("../models/Block");
const { DBConfiguration } = require("./DBConfiguration");

module.exports.DBConnection = () => {
  DBConfiguration.sync()
    .then(() => {
      console.log("Successfully connected to the database");
    })
    .catch((e) => console.log(e));
};
