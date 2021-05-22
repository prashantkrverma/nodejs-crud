const APP = require('express')()
require('dotenv').config()
const CORS = require('cors')
require('./common').middleware(APP)
const { mongoose } = require("./config")
require('./controller')(APP)

// CORS initialize
APP
    .use(
        CORS()
    )

// env config
const PORT = process.env.PORT || 3000

APP
    .listen(
        PORT,
        () => console.log(`Server started @${PORT}`)
    )

// API test
APP
    .get(
        '/',
        (req, res) => {
            res.status(200).send("Hellow Server is running!")
        })
