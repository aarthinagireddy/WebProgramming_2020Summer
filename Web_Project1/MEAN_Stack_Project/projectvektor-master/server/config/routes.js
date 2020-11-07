const courses = require('../controllers/vektors.js');
const path = require('path');

module.exports = function(app){
    app.get('/api/courses', courses.getAllCourses);
    app.get('/api/courses/:id', courses.getSingle);
    app.delete('/api/courses/:id', courses.delete);
    app.delete('/api/courses/:course_id/student/:student_id', courses.removeStudent);
    app.post('/api/courses/new', courses.newOp);
    app.put('/api/courses/:id', courses.update);
    app.post('/api/courses/:id/student', courses.addStudent);
    app.all('*', (req, res)=>{
        res.sendFile(path.resolve('./public/dist/public/index.html'));
    })
}
