const Subscriber = require("../models/Subscriber");

const subscribe = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        // Check if already subscribed
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({ success: false, message: "Email is already subscribed" });
        }

        const newSubscriber = new Subscriber({
            email,
        });

        await newSubscriber.save();

        res.status(201).json({ success: true, message: "Subscribed successfully!" });
    } catch (error) {
        console.error("Error subscribing:", error);
        // Duplicate key error code
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: "Email is already subscribed" });
        }
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

module.exports = { subscribe };
