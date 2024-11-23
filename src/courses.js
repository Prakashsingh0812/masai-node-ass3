const express = require('express');
const router = express.Router();
const { readDatabase, writeDatabase } = require('./utils'); // Importing utility functions for DB handling

// Route to get all courses
router.get('/courses', (req, res) => {
    const courses = readDatabase();
    res.json(courses);
});

// Route to add a new course
router.post('/courses', (req, res) => {
    const courses = readDatabase();
    const newCourse = req.body;
    courses.push(newCourse);
    writeDatabase(courses);
    res.status(201).json({ message: 'Course added successfully!' });
});

// Route to update a course by ID
router.put('/courses/:id', (req, res) => {
    const courses = readDatabase();
    const { id } = req.params;
    const updatedCourse = req.body;

    const index = courses.findIndex(course => course.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Course not found!' });
    }

    courses[index] = { ...courses[index], ...updatedCourse };
    writeDatabase(courses);
    res.status(200).json({ message: 'Course updated successfully!' });
});

// Route to delete a course by ID
router.delete('/courses/:id', (req, res) => {
    const courses = readDatabase();
    const { id } = req.params;

    const index = courses.findIndex(course => course.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Course not found!' });
    }

    courses.splice(index, 1); // Remove course from the array
    writeDatabase(courses);
    res.status(200).json({ message: 'Course deleted successfully!' });
});

module.exports = router;
