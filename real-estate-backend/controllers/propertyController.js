const Property = require("../models/Property");

// Create a new property
exports.createProperty = async (req, res) => {
    try {
        const { title, description, price, location, type, beds, baths, sqft, furnishing } = req.body;

        const newProperty = await Property.create({
            title,
            description,
            price,
            location,
            type,
            beds,
            baths,
            sqft,
            furnishing,
            agent: req.user ? req.user.id : null // Link to agent if logged in
        });

        res.status(201).json(newProperty);
    } catch (error) {
        res.status(500).json({ message: "Error creating property", error: error.message });
    }
};

// Get all properties
exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find().sort({ createdAt: -1 });
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: "Error fetching properties", error: error.message });
    }
};

// Get single property
exports.getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ message: "Property not found" });
        res.json(property);
    } catch (error) {
        res.status(500).json({ message: "Error fetching property", error: error.message });
    }
};

// Delete property
exports.deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        // Check if user is authorized (admin or owner)
        // This is handled by middleware mostly, but extra check can be here

        await property.deleteOne();
        res.json({ message: "Property deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting property", error: error.message });
    }
};
