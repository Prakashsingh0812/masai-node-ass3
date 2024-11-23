const express = require('express');
const fs = require('fs');
const path = require('path');
const { readDatabase, writeDatabase } = require('./utils'); // Importing utility functions for DB handling

const app = express();
app.use(express.json()); // Middleware to parse JSON data

const PORT = 3000;

// Route to get all courses
app.get('/courses', (req, res) => {
    try {
        const courses = readDatabase();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error reading the database' });
    }
});

// Route to add a new course
app.post('/courses', (req, res) => {
    try {
        const courses = readDatabase();
        const newCourse = req.body;
        courses.push(newCourse);
        writeDatabase(courses);
        res.status(201).json({ message: 'Course added successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding the course' });
    }
});

// Route to update a course by ID
app.put('/courses/:id', (req, res) => {
    try {
        const courses = readDatabase();
        const { id } = req.params;
        const updatedCourse = req.body;

        const index = courses.findIndex(course => course.id === id);
        if (index === -1) {
            return res.status(404).json({ message: 'Course not found!' });
        }

        // Update course
        courses[index] = { ...courses[index], ...updatedCourse };
        writeDatabase(courses);
        res.status(200).json({ message: 'Course updated successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating the course' });
    }
});

// Route to delete a course by ID
app.delete('/courses/:id', (req, res) => {
    try {
        const courses = readDatabase();
        const { id } = req.params;

        const index = courses.findIndex(course => course.id === id);
        if (index === -1) {
            return res.status(404).json({ message: 'Course not found!' });
        }

        // Remove course
        courses.splice(index, 1); // Remove course from the array
        writeDatabase(courses);
        res.status(200).json({ message: 'Course deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting the course' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
