// const { restart } = require("nodemon")

const errorHandler = (err, req, res, next) => {
    // If statuscode available then use it, else assign 500
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)

    res.json({
        message: err.message,
        // If app is in production, do not show error stack lines, else show to devs.
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {
    errorHandler,
}