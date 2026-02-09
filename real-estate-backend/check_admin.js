const mongoose = require("mongoose");
const User = require("./models/User");
const dotenv = require("dotenv");

dotenv.config();

const checkAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const email = "admin@dreamnest.com";
        const user = await User.findOne({ email });

        if (!user) {
            console.log(`User ${email} NOT FOUND.`);
        } else {
            console.log(`User found:`, user.email);
            console.log(`Role:`, user.role);
            console.log(`Password Hash:`, user.password);
        }

        mongoose.connection.close();
    } catch (err) {
        console.error(err);
        mongoose.connection.close();
    }
};

checkAdmin();
