const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/StudentDB')
.then(() => {
    console.log("Connected to MongoDB");})
.catch((err) => {
    console.log(err);});

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    grade: String
})

const Student = mongoose.model('Student', studentSchema);


const newStudent = new Student({
    name: "John Doe",
    age: 20,
    grade: "A"
})

newStudent.save()
.then(() => {
    console.log("Student saved to database");
}).catch((err) => {
    console.log(err);   
});