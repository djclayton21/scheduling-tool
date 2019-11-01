const express = require('express')
const shiftRouter = express.Router();
const Shift = require('../models/shift.js')

//get all/ post
shiftRouter.route('/')
    .get((req, res, next) => {
        Shift.find({userId: req.user._id}, (err, foundShifts) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            return res.status(200).send(foundShifts);
        })
    })
    .post((req, res, next) => {
        req.body.userId = req.user._id;
        const newShift = new Shift(req.body)
        newShift.save((err, savedShift) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            return res.status(201).send(savedShift)
        })
    })

//get for employee, including jobs. supports query for future only
shiftRouter.route('/employee/:employeeId')
    .get((req, res, next) => {
        let date = 0;
        if (req.query.future) {
            date = Date.now();
        }
        Shift.find({employees: req.params.employeeId, shiftStart: { $gte: date}})
            .populate('job')
            .exec((err, foundShifts) => {
                if (err) {
                    res.status(500);
                    return next(err);
                }
                return res.status(200).send(foundShifts)
            })
    })
//get all for schedule with employees and job
shiftRouter.route('/schedule/:scheduleId')
    .get((req, res, next) => {
        Shift.find({scheduleId: req.params.scheduleId})
            .populate('job')
            .populate('employees')
            .exec((err, foundShifts) => {
                if (err) {
                    res.status(500);
                    return next(err);
                }
                return res.status(200).send(foundShifts)
            })
    })

//get for schedule by employee with job
shiftRouter.route('/schedule/:scheduleId/employee/:employeeId')
    .get((req, res, next) => {
        Shift.find({scheduleId: req.params.scheduleId, employees: req.params.employeeId})
            .populate('job')
            .exec((err, foundShifts) => {
                if (err) {
                    res.status(500);
                    return next(err);
                }
                return res.status(200).send(foundShifts)
            })
    })
//get one/ edit/ delete
shiftRouter.route('/:shiftId')
    .get((req, res, next) => {
        Shift.findOne({_id: req.params.shiftId}, (err, foundShift) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            return res.status(200).send(foundShift);
        })
    })
    .delete((req, res, next) => {
        Shift.findOneAndRemove({_id: req.params.shiftId}, (err, removedShift) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            return res.status(200).send(removedShift);
        })
    })
    .put((req, res, next) => {
        Shift.findOneAndUpdate({_id: req.params.shiftId}, req.body, {new: true}, (err, updatedShift) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            return res.status(200).send(updatedShift);
        })
    })

module.exports = shiftRouter