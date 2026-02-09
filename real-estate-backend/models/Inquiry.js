const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    propertyId: {
        type: String, // Storing as String for now as property ID from params might be string if using mock data or simple IDs
        required: false,
    },
    propertyTitle: {
        type: String,
        required: false,
    },
    agentName: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        enum: ["pending", "contacted", "closed"],
        default: "pending",
    }
}, { timestamps: true });

module.exports = mongoose.model("Inquiry", inquirySchema);
