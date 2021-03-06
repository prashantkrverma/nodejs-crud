const express = require('express')
const swagger = require('swagger-ui-express')

module.exports = APP => {
    if (APP) console.log('Middleware checked')

    // Body Parser
    APP
        .use(
            express
                .json({
                    extended: true,
                    limit: '5mb'
                }))
    APP
        .use(
            express
                .urlencoded({
                    extended: true,
                    limit: '5mb'
                }))

    // Allow CORS *
    APP.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })

    // This check makes sure this is a JSON parsing issue,
    APP.use((err, req, res, next) => {
        if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
            console.error(err.message);
            return res.status(400).send({
                status: "fail",
                data: {
                    title: "Bad request",
                    description: err.message
                }
            }) // Bad request
        }
        next();
    });

     // Swagger API UI
     APP
     .use("/api-docs", swagger.serve, swagger.setup((require('./docs.api'))))
}
