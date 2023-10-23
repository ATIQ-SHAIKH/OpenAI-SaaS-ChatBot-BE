"use strict";

const express = require("express"),
  helmet = require("helmet"),
  cors = require("cors");

const logger = require("./src/logger")("index");
// Load DB
require("./src/models/index");
// Load conf files
const { ALLOWED_DOMAIN, SRV_PORT, SCRIPT_SOURCES } = require("config");

// Start & init express app
const app = express();
app.use(
  helmet.contentSecurityPolicy({
    defaultSrc: ["'self'"],
    scriptSrc: SCRIPT_SOURCES,
  })
);
app.use(helmet({ contentSecurityPolicy: false }));
app.use(
  express.json({
    limit: "2mb",
  })
);
app.use(
  express.urlencoded({
    limit: "5mb",
    extended: true,
  })
);

app.use(
  cors({
    origin: ALLOWED_DOMAIN,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// Load APIs
app.use("/api", require("./src/routes"));

// Serve static build files
app.get("/*", (req, res) =>
  res.send("Welcome to OpenAI SAAS Chatbot API Server!")
);
// Bind to port
app.listen(SRV_PORT, () => logger.info("🚀 Server running at " + SRV_PORT));
