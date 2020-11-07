import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
course: any;
errors = [];

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    console.log('Edit spun up');
    this._route.params.subscribe(data => {
      console.log('This is the data from route params', data);
      this.getCourseToEdit(data['id']);
    })
  }

  getCourseToEdit(id: string){
    this._httpService.getOne(id).subscribe(data => {
      console.log('Acquiring single', data);
      this.course = data;
    })
  }

  submitEdit(){
    this.errors =[];
    console.log('Course Edit Submission fired');
    this._httpService.updateCourse(this.course).subscribe(data => {
      if(data['errors']){
        for(var err in data['errors']){
          this.errors.push(data['errors'][err]['message'])
        }
      }
      else{
        this._router.navigate(['/vektor/courses'])
      }
    })
  }

}
