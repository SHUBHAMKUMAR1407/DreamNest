const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/propertyController");
const authMiddleware = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware"); // Destructure admin from export
const multer = require("multer");

// Configure Multer (Memory Storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Public Routes
router.get("/", propertyController.getAllProperties);
router.get("/:id", propertyController.getPropertyById);

// Protected Routes
router.post("/", authMiddleware, upload.array("images", 5), propertyController.createProperty);
router.get("/user/my-properties", authMiddleware, propertyController.getUserProperties);
router.put("/:id", authMiddleware, upload.array("images", 5), propertyController.updateProperty);
router.delete("/:id", authMiddleware, propertyController.deleteProperty);

// Admin Routes
router.put("/:id/approve", authMiddleware, admin, propertyController.approveProperty);

module.exports = router;

