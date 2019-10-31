const express = require('express');
const authRouter = express.Router();
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

//signup
authRouter.route('/signup')
    .post((req, res, next) => {
        User.findOne({username: req.body.username.toLowerCase()}, (err, existingUser) => {
            if (err){
                res.status(500)
                return next(err)
            }
            if (existingUser) {
                res.status(400)
                return next (new Error('Username is already taken'))
            }

            const newUser = new User(req.body);
            newUser.save((err, savedUser) => {
                if (err){
                    res.status(500)
                    return next(err)
                }
                const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET);
                return res.status(201).send({user: savedUser.withoutPassword(), token})
            })
        })
        
    })
//login
authRouter.route('/login')
    .post((req, res, next) => {
        User.findOne({username: req.body.username.toLowerCase()}, (err, existingUser) => {
            if (err){
                res.status(500);
                return next(err);
            }
            if (!existingUser) {
                res.status(400);
                return next(new Error('Username or Password is incorrect'))
            }
            existingUser.checkPassword(req.body.password, (err, isMatch) => {
                if (err){
                    res.status(500);
                    return next(err);
                }
                if (!isMatch) {
                    res.status(400);
                    return next(new Error('Username or Password is incorrect'));
                }
                const token = jwt.sign(existingUser.withoutPassword(), process.env.SECRET);
                return res.status(200).send({user: existingUser.withoutPassword(), token});
            })
        })
    })

module.exports = authRouter;