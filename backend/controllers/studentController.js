const express = require("express");
const Student = require("../models/student");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

class Controller {
  async AllStudents(req, res, next) {
    Student.find({}, (error, response) => {
      if (error) return next(error);
      res.send(response);
    });
  }
  async OneStudent(req, res, next) {
    let { id } = req.params;
    Student.findById(id, (error, response) => {
      if (error) return next(error);
      res.send(response);
    });
  }
  async deleteStudent(req, res, next) {
    let { id } = req.params;
    Student.deleteOne({ _id: id }, (error, response) => {
      if (error) return next(error);
      res.send(response);
    });
  }
  async post(req, res, next) {
    let newstudents = new Student({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      address: req.body.address,
    });
    await newstudents.save({}, (error, response) => {
      if (error) return next(error);
      res.send(response);
    });
  }
  async UpdateStudent(req, res, next) {
    const newStudent = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      address: req.body.address,
    };
    let { id } = req.params;
    Student.updateOne({ _id: id }, { $set: newStudent }, (error, response) => {
      if (error) return next(error);
      res.send(response);
    });
  }

  //   //JWT Functions Sign Up And Login
  //   signup = (req, res) => {
  //     const { name, email, password, phone, address } = req.body;

  //     if (!name || !email || !password || !phone || !address) {
  //       res.status(400).json({ msg: "Please enter all fields" });
  //     }

  //     Student.findOne({ email }).then((student) => {
  //       if (student)
  //         return res.status(400).json({ msg: "Student already exists" });

  //       const newStudent = new Student({ name, email, password, phone, address });

  //       // Create salt and hash
  //       bcrypt.genSalt(10, (err, salt) => {
  //         bcrypt.hash(password, salt, (err, hash) => {
  //           if (err) throw err;
  //           newStudent.password = hash;
  //           newStudent.save().then((student) => {
  //             jwt.sign(
  //               { id: student._id },
  //               process.env.JWT_SECRET_KEY,
  //               { expiresIn: 3600 },
  //               (err, token) => {
  //                 if (err) throw err;
  //                 res.json({
  //                   token,
  //                   student: {
  //                     id: student._id,
  //                     name: student.name,
  //                     email: student.email,
  //                     address: student.address,
  //                     password: student.password,
  //                     phone: student.phone,
  //                   },
  //                 });
  //               }
  //             );
  //           });
  //         });
  //       });
  //     });
  //   };
  //   login = async (req, res) => {
  //     const { email, password } = req.body;
  //     if (!email || !password) {
  //       res.status(400).json({ msg: "Please enter all fields" });
  //     }
  //     Student.findOne({ email }).then((student) => {
  //       if (!student)
  //         return res.status(400).json({ msg: "student does not exist" });

  //       // Validate password
  //       bcrypt.compare(password, student.password).then((isMatch) => {
  //         if (!isMatch)
  //           return res.status(400).json({ msg: "Invalid credentials" });

  //         jwt.sign(
  //           { id: student._id },
  //           process.env.JWT_SECRET_KEY,
  //           { expiresIn: 3600 },
  //           (err, token) => {
  //             if (err) throw err;
  //             res.json({
  //               token,
  //               student: {
  //                 id: student._id,
  //                 name: student.name,
  //                 email: student.email,
  //                 address: student.address,
  //                 phone: student.phone,
  //               },
  //             });
  //           }
  //         );
  //       });
  //     });
  //   };
}
const controller = new Controller();
module.exports = controller;
