import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {
    console.log('Spin up complete');
  }

  getCourses() {
    console.log('Acquiring courses');
    return this._http.get('/api/courses');
  }

  getOne(id: string) {
    console.log('Acquiring one course');
    return this._http.get(`/api/courses/${id}`);
  }

  newCourse(course: any) {
    console.log('Creating new course', course);
    return this._http.post('/api/courses/new', course);
  }

  abortCourse(course: any) {
    console.log('Delete Service fired', course);
    return this._http.delete(`/api/courses/${course}`);
  }

  updateCourse(course: any) {
    console.log('Passed this', course);
    console.log('Supposed id passed:', `${course._id}`);
    return this._http.put(`api/courses/${course._id}`, course);
  }

  addStudent(course_id: string, newStudent: any) {
    console.log('addStudent fired');
    return this._http.post(`/api/courses/${course_id}/student`, newStudent);
  }

  removeStudent(course_id: string, student: any) {
    console.log('removeStudent service fired');

    //student.id may be subject to error
    return this._http.delete(`/api/courses/${course_id}/student/${student._id}`, student);
  }
}

//For reference only
// module.exports = function(app){
//   app.get('/api/courses', courses.getAllCourses);
//   app.get('/api/courses/:id', courses.getSingle);
//   app.delete('/api/courses/:id', courses.delete);
//   app.delete('/api/courses/:course_id/student/:student_id', courses.removeStudent);
//   app.post('/api/courses/new', courses.newOp);
//   app.put('/api/courses/:id', courses.update);

//   app.post('/api/courses/:id/student', courses.addReview);

//   app.all('*', (req, res)=>{
//       res.sendFile(path.resolve('./public/dist/public/index.html'));
//   })
// }
