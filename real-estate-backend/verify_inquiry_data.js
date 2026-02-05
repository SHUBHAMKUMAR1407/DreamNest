const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Inquiry = require("./models/Inquiry");

dotenv.config();

const verifyInquiry = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const inquiries = await Inquiry.find().sort({ createdAt: -1 });

        console.log(`Found ${inquiries.length} inquiry entries:`);
        inquiries.forEach((i, idx) => {
            console.log(`${idx + 1}. Name: ${i.name}, Property: ${i.propertyTitle}, Agent: ${i.agentName}`);
        });

        mongoose.connection.close();
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

verifyInquiry();
