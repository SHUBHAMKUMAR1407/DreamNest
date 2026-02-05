const express = require("express");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Protected route example
router.post("/add", auth, (req, res) => {
  if (req.user.role === "user") {
    return res.status(403).json({ message: "Not authorized" });
  }

  res.json({ message: "Property added by " + req.user.role });
});

module.exports = router;

