const express = require('express');
const jobRouter = express.Router();
const Job = require('../models/job.js');

//get all and post
jobRouter.route('/')
    .get((req, res, next) => {
        Job.find({userId: req.user._id}, (err, foundJobs) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            return res.status(200).send(foundJobs)
        })
    })
    .post((req, res, next) => {
        req.body.userId = req.user._id;
        const newJob = new Job(req.body);
        newJob.save((err, savedJob) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            return res.status(201).send(newJob);
        })
    })
    
module.exports = jobRouter;