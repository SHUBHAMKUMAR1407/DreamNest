const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load env vars
dotenv.config();

// Connect to Database
connectDB();
// console.log("Using Local File Database (data/db.json)");

const app = express();

// Middleware
app.use(express.json()); // Body parser

// CORS Configuration
app.use(cors({
  origin: function(origin, callback) {
    // Allow all origins
    callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200
}));

// Handle preflight requests
app.options('*', cors());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/properties", require("./routes/propertyRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/inquiries", require("./routes/inquiryRoutes"));
app.use("/api/subscribe", require("./routes/subscriberRoutes"));

// Root Route
app.get("/", (req, res) => {
    res.send("Real Estate API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
