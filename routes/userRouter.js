const express = require('express')
const userRouter = express.Router()
const User = require('../models/user.js')

userRouter.route('/')
    .get((req, res, next) => {
        User.find((err, allUsers) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            return res.status(200).send(allUsers);
        })
    })

module.exports = userRouter;