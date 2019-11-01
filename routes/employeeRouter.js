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
            return res.status(201).send(savedEmployee);
        })
    })

//get employee with jobs
employeeRouter.route('/full/:employeeId')
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
            return res.status(200).send(updatedEmployee)
        })
    })

module.exports = employeeRouter;