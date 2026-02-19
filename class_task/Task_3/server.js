const express = require('express');
const app = express();

app.set('view engine', 'ejs');   // Set EJS as template engine
app.use(express.urlencoded({ extended: true })); // Parse form data

let students = [
    { id: 1, name: "Manuradha", marks: 95, grade: "A" },
    { id: 2, name: "Rahul", marks: 45, grade: "C" },
    { id: 3, name: "Ananya", marks: 30, grade: "F" },
    { id: 4, name: "Sneha", marks: 85, grade: "A" },
    { id: 5, name: "Yash", marks: 45, grade: "C" },
    { id: 6, name: "Erica", marks: 30, grade: "F" }
];

app.get('/students', (req, res) => {
    res.render('students', { students });
});

app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).send("Student not found");
    res.render('student', { student });
});

app.get('/add-student', (req, res) => {
    res.render('add-student');
});

app.post('/add-student', (req, res) => {
    const { name, marks, grade } = req.body;
    const newStudent = {
        id: students.length ? students[students.length - 1].id + 1 : 1,
        name,
        marks: parseInt(marks),
        grade
    };
    students.push(newStudent);
    res.redirect('/students');
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});


