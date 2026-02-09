const Inquiry = require("../models/Inquiry");

const createInquiry = async (req, res) => {
    try {
        const { name, email, message, propertyId, propertyTitle, agentName } = req.body;

        const newInquiry = new Inquiry({
            name,
            email,
            message,
            propertyId,
            propertyTitle,
            agentName
        });

        await newInquiry.save();

        res.status(201).json({ success: true, message: "Inquiry sent successfully!" });
    } catch (error) {
        console.error("Error saving inquiry:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

module.exports = { createInquiry, getAllInquiries };
