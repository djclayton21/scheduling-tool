const express = require('express');
const scheduleRouter = express.Router();
const Schedule = require('../models/schedule.js');
const moment = require('moment');
moment().format()

//get all/ post per user
scheduleRouter.route('/')
    .get((req, res, next) => {
        Schedule.find({userId: req.user._id}, (err, foundSchedules) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            return res.status(200).send(foundSchedules)
        })
    })
    .post((req, res, next) => {
        req.body.userId = req.user._id;
        req.body.scheduleEnd = moment(req.body.scheduleStart).add(7, 'days').toDate();
        const newSchedule = new Schedule(req.body);
        newSchedule.save((err, savedSchedule) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            return res.status(201).send(savedSchedule.simpleSchedule())
        })
    })
//simple versions, supports future only
scheduleRouter.route('/simple')
    .get((req, res, next) => {
        let searchTime = 0;
        if (req.query.future) {
            searchTime = Date.now();
        }
        Schedule.find(
            {userId: req.user._id, scheduleEnd: { $gte: searchTime}},
            'scheduleStart scheduleEnd scheduleName',
            {sort: {scheduleStart: 1}},
            (err, foundSchedules) => {
                if (err) {
                    res.status(500);
                    return next(err);
                }
                return res.status(200).send(foundSchedules)
            }
        )
    })
//get schedule with shifts populated
scheduleRouter.route('/populated/:scheduleId')
    .get((req, res, next) => {
        Schedule.findOne({_id: req.params.scheduleId})
            .populate('monday')
            .populate('tuesday')
            .populate('wednesday')
            .populate('thursday')
            .populate('friday')
            .populate('saturday')
            .populate('sunday')
            .populate('jobs')
            .exec((err, populatedSchedule) => {
                if (err) {
                    res.status(500);
                    return next(err);
                }
                return res.status(200).send(populatedSchedule)
            })
    })

//get one/ put/ delete
scheduleRouter.route('/:scheduleId')
    .get((req, res, next) => {
        Schedule.findOne({_id: req.params.scheduleId}, (err, foundSchedule) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            return res.status(200).send(foundSchedule);
        })
    })
    .delete((req, res, next) => {
        Schedule.findOneAndRemove({_id: req.params.scheduleId}, (err, removedSchedule) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            return res.status(200).send(removedSchedule);
        })
    })
    .put((req, res, next) => {
        req.body.scheduleEnd = moment(req.body.scheduleStart).add(7, 'days').toDate();
        Schedule.findOneAndUpdate({_id: req.params.scheduleId}, req.body, {new: true}, (err, updatedSchedule) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            return res.status(200).send(updatedSchedule);
        })
    })
module.exports = scheduleRouter;