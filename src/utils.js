const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, '../db.json');

// Function to read the database
const readDatabase = () => {
    try {
        return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('Database file not found. Returning an empty array.');
            fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf-8');
            return [];
        } else if (error instanceof SyntaxError) {
            console.error('Malformed JSON in db.json. Resetting to an empty array.');
            fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf-8');
            return [];
        } else {
            throw error;
        }
    }
};

// Function to write data to the database
const writeDatabase = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
};

module.exports = { readDatabase, writeDatabase };
