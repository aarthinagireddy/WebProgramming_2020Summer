import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  new: any;
  errors = [];

  constructor(private _httpService: HttpService, private _router: Router) { }

  ngOnInit() {
    console.log('Add Component fired');
    this.new = {name: '', description: '', instructor: '', location: '', date: ''}
  }

  addNew() {
    this.errors =[];
    console.log('Initiating new course', this.new);
    this._httpService.newCourse(this.new).subscribe(data => {
      if(data['errors']) {
        for(var err in data['errors']) {
          this.errors.push(data['errors'][err]['message'])
        }
      }
      else {
        this._router.navigate(['/vektor'])
        this.new = {name: '', description: '', instructor: '', location: '', date: ''}
      }
    })
  }

}
