const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected for Seeding");

        const email = "admin@dreamnest.com";
        const password = "admin123";
        const name = "Super Admin";

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let user = await User.findOne({ email });

        if (user) {
            user.password = hashedPassword;
            user.role = "admin";
            user.name = name;
            await user.save();
            console.log("✅ Admin user updated successfully!");
        } else {
            user = await User.create({
                name,
                email,
                password: hashedPassword,
                role: "admin",
            });
            console.log("✅ Admin user created successfully!");
        }

        console.log(`
      ---------------------------------------
      Login Credentials:
      Email:    ${email}
      Password: ${password}
      ---------------------------------------
    `);

        mongoose.disconnect();
    } catch (error) {
        console.error("❌ Seeding Error:", error);
        process.exit(1);
    }
};

seedAdmin();
