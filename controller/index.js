const { People } = require('../schema')

module.exports = APP => {
    if (APP) console.info('Controllers checked')
    APP.post('/api/people', (req, res) => {
        const {
            fName,
            lName,
            phone,
            email,
            avatar
        } = req.body
        People.create({ fName, lName, phone, email, avatar }, (err, result) => {
            if (err) res
                .status(400)
                .send({
                    status: "error",
                    data: {
                        title: "Invalid data",
                        description: err.message
                    }
                })
            else res
                .status(201)
                .send({
                    status: "success",
                    data: {
                        title: "Successfully registered.",
                        description: `${fName} is successfully resgister with ${email}`
                    }
                });
        })
    })
    APP.get('/api/people', (req, res) => {
        People.find({}, (err, result) => {
            if (err) res
                .status(400)
                .send({
                    status: "error",
                    data: {
                        title: "Invalid data",
                        description: err.message
                    }
                })
            else res
                .status(200)
                .send({
                    status: "success",
                    data: {
                        title: "Peoples List",
                        description: "All People list from the collection",
                        property: result
                    }
                });
        })
    })
    APP.get('/api/people/:user_id', (req, res) => {
        People.findById({ _id: req.params.user_id }, (err, result) => {
            if (err) res
                .status(400)
                .send({
                    status: "error",
                    data: {
                        title: "Invalid data",
                        description: err.message
                    }
                })
            else if (result) res
                .status(200)
                .send({
                    status: "success",
                    data: {
                        title: "User Details",
                        description: "All details of a user by Id",
                        property: result
                    }
                });
            else res
                .status(404)
                .send({
                    status: "fail",
                    data: {
                        title: "User not found",
                        description: "No user found with requested Id"
                    }
                });
        })
    })
    APP.put('/api/people/:user_id', (req, res) => {
        const {
            fName,
            lName,
            phone,
            email,
            avatar
        } = req.body
        People.findByIdAndUpdate({ _id: req.params.user_id }, { fName, lName, phone, email, avatar }, (err, result) => {
            if (err) res
                .status(400)
                .send({
                    status: "error",
                    data: {
                        title: "Invalid data",
                        description: err.message
                    }
                })
            else res
                .status(200)
                .send({
                    status: "success",
                    data: {
                        title: "Successfully updated.",
                        description: `${fName} is successfully updated details`
                    }
                });
        })
    })
    APP.delete('/api/remove/:user_id', (req, res) => {
        People.findByIdAndDelete({ _id: req.params.user_id }, (err, result) => {
            if (err) res
                .status(400)
                .send({
                    status: "error",
                    data: {
                        title: "Invalid data",
                        description: err.message
                    }
                })
            else if (result) res
                .status(200)
                .send({
                    status: "success",
                    data: {
                        title: "Successfully deleted.",
                        description: `User is successfully deleted.`
                    }
                });
            res
                .status(404)
                .send({
                    status: "fail",
                    data: {
                        title: "User not found",
                        description: "No user found with requested Id"
                    }
                });
        })
    })
}