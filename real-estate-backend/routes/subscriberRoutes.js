const express = require("express");
const { subscribe, getAllSubscribers } = require("../controllers/subscriberController");

const router = express.Router();

router.post("/", subscribe);
router.get("/", getAllSubscribers);

module.exports = router;
