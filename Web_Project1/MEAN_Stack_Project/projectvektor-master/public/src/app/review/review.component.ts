import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  course: any;
  student: any;
  errors = [];

  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    console.log('Register for course fired');
    this._route.params.subscribe(data => {
      console.log(data);
      this.getCourse(data['id']);
    })
    this.student = {callsign: '', specialty: '', luckynumber: ''};
  }

  getCourse(id: string) {
    this._httpService.getOne(id).subscribe(data => {
      console.log('Acquiring single for review', data);
      this.course = data;
    })
  }

  registerStudent(id: string){
    this.errors =[];
    this._httpService.addStudent(id, this.student).subscribe(data =>{
      if(data['errors']){
        console.log('Hit error', data['errors']);
        for(var err in data['errors']){
          this.errors.push(data['errors'][err]['message'])
        }
      }
      else{
        console.log(data);
        this.student = {callsign: '', specialty: '', luckynumber: ''};

        // Flash success message?

        this._router.navigate(['/vektor/courses'])
      }
    })
  }

}
