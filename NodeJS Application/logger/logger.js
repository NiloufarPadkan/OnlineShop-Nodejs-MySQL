const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, prettyPrint, colorize } = format;

const logger = createLogger({
    //  level: "info",
    format: combine(label({ label: "  label: `Label🏷️`" }), timestamp(), prettyPrint()),
    colorize: true,
    //  defaultMeta: { service: "user-service" },
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //

        new transports.File({ filename: "./logger/error.log", level: "error" }),
        new transports.File({ filename: "./logger/combined.log" }),
    ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
    logger.add(
        new transports.Console({
            format: format.simple(),
        })
    );
}

module.exports = logger;
