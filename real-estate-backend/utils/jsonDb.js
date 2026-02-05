const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../data/db.json");

// Read Database
const readDb = () => {
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify({ users: [], properties: [] }, null, 2));
    }
    const data = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(data);
};

// Write Database
const writeDb = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// Generate ID
const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
};

module.exports = { readDb, writeDb, generateId };
