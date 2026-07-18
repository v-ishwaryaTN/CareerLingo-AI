const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { getJobs, applyToJob, getMyApplications } = require("../controllers/jobController");
router.get("/", getJobs);
router.post("/:id/apply", protect, applyToJob);
router.get("/applications/mine", protect, getMyApplications);
module.exports = router;