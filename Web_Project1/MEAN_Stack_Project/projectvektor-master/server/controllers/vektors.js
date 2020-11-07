const mongoose = require('mongoose');
const Student = mongoose.model('Student');
const Course = mongoose.model('Course');

module.exports = {
    getAllCourses: (req, res) => {
        console.log('Current Courses acquired from db');
        Course.find({}, (err, data) => {
            if (err) {
                res.json(err);
            }
            else {
                res.json(data);
            }
        })
    },

    getSingle: (req, res) => {
        Course.findOne({ _id: req.params.id }, (err, data) => {
            if (err) {
                res.json(err);
            }
            else {
                res.json(data);
            }
        })
    },

    newOp: (req, res) => {
        Course.create(req.body, (err, data) => {
            if (err) {
                console.log(err);
                res.json(err);
            }
            else {
                res.json(data);
            }
        })
    },

    update: (req, res) => {
        Course.findById(req.params.id, (err, foredit) => {
            if (err) {
                console.log('Could not find that course');
                res.json(err);
            }
            else {
                foredit.name = req.body.name;
                foredit.description = req.body.description;
                foredit.instructor = req.body.instructor;
                foredit.location = req.body.location;
                foredit.date = req.body.date;
                foredit.save((err, success) =>{
                    if(err){
                        console.log('Try again', err);
                        res.json(err);
                    }
                    else{
                        console.log('Successfully updated course!')
                        res.json(success);
                    }
                })
            }
        })
    },
    
    delete: (req, res) => {
        Course.deleteOne({ _id: req.params.id }, (err, data) => {
            if (err) {
                res.json(err);
            }
            else {
                res.json(data);
            }
        })
    },

    addStudent: (req, res) => {
        Student.create(req.body, (err, newstudent) => {
            if (err) {
                res.json(err);
            }
            else {
                Course.update({ _id: req.params.id }, { $push: { students: newstudent } }, (err, data) => {
                    if (err) {
                        res.json(err);
                    }
                    else {
                        res.json(data);
                    }
                })
            }
        })
    },

    removeStudent: (req, res) => {
        Course.update({_id: req.params.course_id}, {$pull: {students: {_id: req.params.student_id}}}, (err, data) => {
            if(err) {
                res.json(err)
            }
            else {
                res.json(data);
            }
        })
    }

}