const express = require("express");
const Teacher = require("../models/teacher");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class Controller {
  async AllTeachers(req, res, next) {
    Teacher.find({}, (error, response) => {
      if (error) return next(error);
      res.send(response);
    });
  }

  async OneTeacher(req, res, next) {
    let { id } = req.params;
    Teacher.findById(id, (error, response) => {
      if (error) return next(error);
      res.send(response);
    });
  }
  async deleteTeacher(req, res, next) {
    let { id } = req.params;
    Teacher.deleteOne({ _id: id }, (error, response) => {
      if (error) return next(error);
      res.send(response);
    });
  }
  async UpdateTeacher(req, res, next) {
    const newTeacher = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      address: req.body.address,
    };
    let { id } = req.params;
    Teacher.updateOne({ _id: id }, { $set: newTeacher }, (error, response) => {
      if (error) return next(error);
      res.send(response);
    });
  }

  //JWT Functions Sign Up And Login
  signup = (req, res) => {
    const { name, email, password, phone, address } = req.body;

    if (!name || !email || !password || !phone || !address) {
      res.status(400).json({ msg: "Please enter all fields" });
    }

    Teacher.findOne({ email }).then((teacher) => {
      if (teacher)
        return res.status(400).json({ msg: "Teacher already exists" });

      const newTeacher = new Teacher({ name, email, password, phone, address });

      // Create salt and hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          newTeacher.password = hash;
          newTeacher.save().then((teacher) => {
            jwt.sign(
              { id: teacher._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  teacher: {
                    id: teacher._id,
                    name: teacher.name,
                    email: teacher.email,
                    address: teacher.address,
                    password: teacher.password,
                    phone: teacher.phone,
                  },
                });
              }
            );
          });
        });
      });
    });
  };
  login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ msg: "Please enter all fields" });
    }
    Teacher.findOne({ email }).then((teacher) => {
      if (!teacher)
        return res.status(400).json({ msg: "teacher does not exist" });

      // Validate password
      bcrypt.compare(password, teacher.password).then((isMatch) => {
        if (!isMatch)
          return res.status(400).json({ msg: "Invalid credentials" });

        jwt.sign(
          { id: teacher._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              teacher: {
                id: teacher._id,
                name: teacher.name,
                email: teacher.email,
                address: teacher.address,
              },
            });
          }
        );
      });
    });
  };
}
const controller = new Controller();
module.exports = controller;
