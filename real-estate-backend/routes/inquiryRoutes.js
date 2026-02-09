const express = require("express");
const { createInquiry, getAllInquiries } = require("../controllers/inquiryController");

const router = express.Router();

router.post("/", createInquiry);
router.get("/", getAllInquiries);

module.exports = router;
