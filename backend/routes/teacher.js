const express = require("express");
const router = express.Router();
var controller = require("../controllers/teacherController");

router.get("/", controller.AllTeachers);
router.get("/:id", controller.OneTeacher);
router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.put("/:id", controller.UpdateTeacher);
router.delete("/:id", controller.deleteTeacher);

module.exports = router;
