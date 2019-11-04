const express = require('express');
const employeeRouter = express.Router();
const Employee = require('../models/employee.js');

//get all, post for user
employeeRouter.route('/')
    .get((req, res, next) => {
        Employee.find({userId: req.user._id}, (err, foundEmployees) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            return res.status(200).send(foundEmployees)
        })
    })
    .post((req, res, next) => {
        req.body.userId = req.user._id;
        const newEmployee = new Employee(req.body);
        newEmployee.save((err, savedEmployee) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            Employee.findOne({_id: savedEmployee._id})
                .populate('jobs')
                .exec((err, populatedEmployee) => {
                    if (err) {
                        res.status(500);
                        return next(err);
                    }
                    return res.status(201).send(populatedEmployee)
                })
        })
    })
  
//get all employees per user, poplulated
employeeRouter.route('/populated/')
    .get((req, res, next) => {
        Employee.find({userId: req.user._id})
            .populate('jobs')
            .exec((err, foundEmployees) => {
                if (err) {
                    res.status(500);
                    return next(err);
                }
                return res.status(200).send(foundEmployees)
            })
    })
//get populated employee
employeeRouter.route('/populated/:employeeId')
    .get((req, res, next) => {
        Employee.findOne({_id: req.params.employeeId})
            .populate('jobs')
            .exec((err, foundEmployee) => {
                if (err) {
                    res.status(500);
                    return next(err);
                }
                return res.status(200).send(foundEmployee)
            })
    })
  
//get all employees who can do job
employeeRouter.route('/job/:jobId')
    .get((req, res, next) => {
        Employee.find({jobs: req.params.jobId, userId: req.user._id},(err, foundEmployees) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            return res.status(200).send(foundEmployees)
        })
    })

//get one/ edit/ delete
employeeRouter.route('/:employeeId')
    .get((req, res, next) => {
        Employee.findOne({_id: req.params.employeeId}, (err, foundEmployee) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            return res.status(200).send(foundEmployee);
        })
    })
    .delete((req, res, next) => {
        Employee.findOneAndRemove({_id: req.params.employeeId}, (err, removedEmployee) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            return res.status(200).send(removedEmployee);
        })
    })
    .put((req, res, next) => {
        Employee.findOneAndUpdate({_id: req.params.employeeId}, req.body, {new: true}, (err, updatedEmployee) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            Employee.findOne({_id: updatedEmployee._id})
                .populate('jobs')
                .exec((err, populatedEmployee) => {
                    if (err) {
                        res.status(500);
                        return next(err);
                    }
                    return res.status(200).send(populatedEmployee)
                })
        })
    })

module.exports = employeeRouter;