const express = require("express");
const { createInquiry, getAllInquiries } = require("../controllers/inquiryController");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", createInquiry);
router.get("/", authMiddleware, getAllInquiries);

module.exports = router;
