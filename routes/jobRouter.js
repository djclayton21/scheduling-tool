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
        });
    })
    .post((req, res, next) => {
        req.body.userId = req.user._id;
        const newJob = new Job(req.body);
        newJob.save((err, savedJob) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            return res.status(201).send(savedJob);
        });
    })

//get one/ edit/ delete
jobRouter.route('/:jobId')
    .get((req, res, next) => {
        Job.findOne({_id: req.params.jobId}, (err, foundJob) => {
            if (err){
                res.status(500);
                return next(err);
            }
            return res.status(200).send(foundJob);
        });
    })
    .put((req, res, next) => {
        Job.findOneAndUpdate({_id: req.params.jobId}, req.body, {new: true}, (err, updatedJob) => {
            if (err){
                res.status(500);
                return next(err);
            }
            return res.status(200).send(updatedJob);
        });
    })
    .delete((req, res, next) => {
        Job.findOneAndRemove({_id: req.params.jobId}, (err, deletedJob) => {
            if (err){
                res.status(500);
                return next(err);
            }
            return res.status(200).send(deletedJob);
        });
    })
    
module.exports = jobRouter;