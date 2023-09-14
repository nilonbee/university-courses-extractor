const express = require("express");
const router = express.Router();
const {
  getDataByNottinghamTrentUniversity,
  getInformationByNottinghamTrentUniversity,
} = require("../controllers/nottinghamTrentUniversity");
const { getCoursesUnisa, getInfo } = require("../controllers/unisa");
const getUniversities = require("../controllers/universities");
const getHotCourses = require("../controllers/hotCourses");
const getSingleCourse = require("../controllers/singleCourse");

router.route("/ntd/courses").get(getDataByNottinghamTrentUniversity);
router.route("/ntd/Info").get(getInformationByNottinghamTrentUniversity);
router.route("/unisa/courses").get(getCoursesUnisa);
router.route("/unisa/info").get(getInfo);
router.route("/universities").get(getUniversities);
router.route("/hotCourses").get(getHotCourses);
router.route("/singleCourse").get(getSingleCourse);

module.exports = router;
