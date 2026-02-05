const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Subscriber = require("./models/Subscriber");

dotenv.config();

const verifySubscriber = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const subscribers = await Subscriber.find().sort({ createdAt: -1 });

        console.log(`Found ${subscribers.length} subscribers:`);
        subscribers.forEach((s, idx) => {
            console.log(`${idx + 1}. Email: ${s.email}`);
        });

        mongoose.connection.close();
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

verifySubscriber();
