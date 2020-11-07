const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    callsign: {type: String, required: [true, 'Callsign required'], minlength: [3, 'Callsign must be three or more characters']},
    specialty: {type: String, required: [true, 'Please disclose your specialty'], minlength: [1, 'Specialty must be more than one character']},
    luckynumber: {type: Number, required: [true, 'Please provide your lucky number'], min: [1, 'Stay positive']},
    comment: {type: String, minlength: [2, 'Review should be two or more characters']}
});
mongoose.model('Student', StudentSchema);

const CourseSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Course name required'], minlength: [3, 'Course name must be three or more characters']},
    description: {type: String, required: [true, 'Course description required'], minlength: [3, 'Course description must be three or more characters']},
    instructor: {type: String, required: [true, 'Primary instructor required'], minlength: [2, 'Instructor name must be three or more characters in length']},
    location: {type: String, required: [true, 'Course location required'], minlength: [3, 'Course location must be three or more characters']},
    date: {type: Date, required: [true, 'Course date required'], min: [Date.now, 'Must be future date']},
    students: [StudentSchema]
});
mongoose.model('Course', CourseSchema);