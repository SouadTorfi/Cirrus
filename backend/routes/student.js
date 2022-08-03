const express = require("express");
const router = express.Router();
var controller = require("../controllers/studentController");

router.get("/", controller.AllStudents);
router.post("/add", controller.post);
router.get("/:id", controller.OneStudent);
router.put("/:id", controller.UpdateStudent);
router.delete("/:id", controller.deleteStudent);

module.exports = router;
