const { createLogger, format, transports } = require("winston");

const initLogger = (fileName = "no name") => {
  const myFormat = format.printf(
    (log) => `${log.timestamp} [${log.label}] ${log.level}: ${log.message}`
  );
  const logger = createLogger({
    format: format.combine(
      format.timestamp(),
      format.label({ label: `file: ${fileName}` }),
      myFormat
    ),
    transports: [
      /**
       - Write all logs with importance level of `error` or less to `error.log`
       - Write all logs with importance level of `info` or less to `combined.log`
       */
      new transports.File({
        filename: "./logs/error.log",
        level: "error",
      }),
      new transports.File({ 
        filename: "./logs/info.log", 
        level: "info" 
      }),
    ],
  });

  /**
   If we're not in production then log to the `console` with the format:
   `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  */
  if (process.env.NODE_ENV !== "production") {
    logger.add(
      new transports.Console({
        format: format.combine(
          format.colorize(),
          format.timestamp(),
          format.prettyPrint(),
          myFormat
        ),
      })
    );
  }

  return logger;
};

module.exports = initLogger;
