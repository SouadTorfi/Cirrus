const express = require("express");
const router = express.Router();
var controller = require("../controllers/homeworkController");

router.get("/", controller.AllHomeworks);
router.get("/:id", controller.OneHomework);
router.post("/", controller.post);
router.put("/:id", controller.UpdateHomework);
router.delete("/:id", controller.deleteHomework);

module.exports = router;
