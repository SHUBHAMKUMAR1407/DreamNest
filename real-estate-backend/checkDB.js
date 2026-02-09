const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Property = require("./models/Property");
const fs = require("fs");

dotenv.config();

const checkDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        const properties = await Property.find({}).select("title images");
        const jsonContent = JSON.stringify(properties, null, 2);

        fs.writeFileSync("db_dump.json", jsonContent, "utf8");
        console.log("DB dump written to db_dump.json");

        mongoose.disconnect();
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

checkDB();
