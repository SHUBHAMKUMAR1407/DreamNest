const express = require("express");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Public route for testing (or protect later)
router.post("/", require("../controllers/propertyController").createProperty);

router.get("/", require("../controllers/propertyController").getAllProperties);
router.get("/:id", require("../controllers/propertyController").getPropertyById);
router.delete("/:id", require("../controllers/propertyController").deleteProperty);

module.exports = router;

