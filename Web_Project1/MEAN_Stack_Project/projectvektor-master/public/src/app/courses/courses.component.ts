import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: any = [];
  target_id = [];

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getEm();
  }

  getEm() {
    this._httpService.getCourses().subscribe(data => {
      console.log('Retrieving courses', data)
      this.courses = data;
    })
  }

  standByToRedact(target: any) {
    this.target_id = [];
    console.log('Standing by to redact', target);
    this.target_id.push(target);

  }

  redactCourse() {
    console.log('Delete Function fired ////////', this.target_id);
    this._httpService.abortCourse(this.target_id).subscribe(data => {
      this.getEm();
    })
  }

}
