const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

const createOrUpdateAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const email = "admin@dreamnest.com";
        const password = "admin123";
        const adminData = {
            name: "Admin User",
            email: email,
            role: "admin",
            phone: "0000000000"
        };

        let user = await User.findOne({ email });

        if (user) {
            console.log(`Admin user found. Updating password and role...`);
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            user.role = "admin"; // Ensure role is admin
            await user.save();
            console.log("Admin user updated successfully.");
        } else {
            console.log(`Admin user NOT found. Creating new admin...`);
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            user = await User.create({
                ...adminData,
                password: hashedPassword
            });
            console.log("Admin user created successfully.");
        }

        mongoose.connection.close();
    } catch (err) {
        console.error("Error:", err);
        mongoose.connection.close();
    }
};

createOrUpdateAdmin();
