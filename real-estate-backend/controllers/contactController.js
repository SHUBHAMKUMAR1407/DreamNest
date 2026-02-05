const Contact = require("../models/Contact");

const createContact = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        const newContact = new Contact({
            name,
            email,
            phone,
            message,
        });

        await newContact.save();

        res.status(201).json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        console.error("Error saving contact:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

module.exports = { createContact };
