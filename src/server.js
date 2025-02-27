const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blogs_app'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Get all students
app.get('/students', (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Add a student
app.post('/students', (req, res) => {
    const { name, rollNo, mobile, course, address } = req.body;

    // Check if all required fields are provided
    if (!name || !rollNo || !mobile || !course || !address) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Insert student into the database
    db.query(
        'INSERT INTO students (student_name, roll_no, mobile, course, address) VALUES (?, ?, ?, ?, ?)',
        [name, rollNo, mobile, course, address],
        (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Failed to add student', error: err.message });
            }
            res.json({ message: 'Student added successfully', id: result.insertId });
        }
    );
});


// Update a student
app.put('/students/:id', (req, res) => {
    const { name, rollNo, mobile, course, address } = req.body;
    const { id } = req.params;
    db.query('UPDATE students SET student_name=?, roll_no=?, mobile=?, course=?, address=? WHERE id=?',
        [name, rollNo, mobile, course, address, id], (err) => {
            if (err) throw err;
            res.json({ message: 'Student updated successfully' });
        });
});

// Delete a student
app.delete('/students/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM students WHERE id=?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Student deleted successfully' });
    });
});

// Start the server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
