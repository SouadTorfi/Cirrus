const express = require("express");
const Homework = require("../models/homework");

class Controller {
  async AllHomeworks(req, res, next) {
    Homework.find({})
      .populate("teacher_id")
      .populate("student_id")
      .exec(function (error, response) {
        if (error) return next(error);
        res.send(response);
      });
  }

  async OneHomework(req, res, next) {
    let { id } = req.params;
    Homework.findById(id, (error, response) => {
      if (error) return next(error);
      res.send(response);
    });
  }
  async deleteHomework(req, res, next) {
    let { id } = req.params;
    Homework.deleteOne({ _id: id }, (error, response) => {
      if (error) return next(error);
      res.send(response);
    });
  }
  async post(req, res, next) {
    let newHomework = new Homework({
      subject: req.body.subject,
      text: req.body.text,
      note: req.body.note,
      teacher_id: req.body.teacher_id,
      student_id: req.body.student_id,
    });
    await newHomework.save({}, (error, response) => {
      if (error) return next(error);
      res.send(response);
    });
  }
  async UpdateHomework(req, res, next) {
    const newHomework = {
      subject: req.body.subject,
      text: req.body.text,
      note: req.body.note,
      teacher_id: req.body.teacher_id,
      student_id: req.body.student_id,
    };
    let { id } = req.params;
    Homework.updateOne(
      { _id: id },
      { $set: newHomework },
      (error, response) => {
        if (error) return next(error);
        res.send(response);
      }
    );
  }
}
const controller = new Controller();
module.exports = controller;
