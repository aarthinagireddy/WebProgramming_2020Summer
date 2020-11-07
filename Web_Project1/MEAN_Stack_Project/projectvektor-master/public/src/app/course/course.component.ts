import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course: any;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute) { }

  ngOnInit() {
    console.log('Single course spun up');
    this._route.params.subscribe(data => {
      console.log(data);
      this.getACourse(data['id']);
    })
  }

  getACourse(id: string){
    this._httpService.getOne(id).subscribe(data => {
      console.log('Acquiring single', data);
      this.course = data;
    })
  }

}
