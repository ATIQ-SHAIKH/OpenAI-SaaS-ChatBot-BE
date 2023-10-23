"use strict";

const { connect, connection } = require("mongoose");
const { DB_URL } = require("config");
const logger = require("../logger")("/models/index");

connection.on("connecting", () => {
  logger.info("Mongo connecting");
});
connection.on("connected", () => {
  logger.info("Mongo connected");
});
connection.on("disconnecting", () => {
  logger.info("Mongo disconnecting");
});
connection.on("disconnected", () => {
  logger.info("Mongo disconnected");
});

connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
