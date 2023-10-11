const express = require("express");
const router = express.Router();
const getUniversities = require("../controllers/universities");
const getAllCourses = require("../controllers/courses");
const getAllDocuments = require("../controllers/courseData");

router.route("/universities").post(getUniversities);
router.route("/partTwo").post(getAllCourses);
router.route("/partThree").post(getAllDocuments);

module.exports = router;
