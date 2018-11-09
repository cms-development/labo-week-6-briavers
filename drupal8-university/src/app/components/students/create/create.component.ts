import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Axios from 'axios';
import { HttpHeaders } from '@angular/common/http';
import { HttpCallService } from 'src/app/services/http-call.service';




@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {


  public editForm: FormGroup;

  public article;
  public date;
  public error;
  public token;
  public id = this.route.snapshot.paramMap.get('id');
  public courses;
  loading = false;
  submitted = false;
  constructor(
    private httpCall: HttpCallService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    localStorage.getItem('token') ? this.token = localStorage.getItem('token') : this.router.navigateByUrl('/login')
    this.getCourses()
    
    this.editForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      courses: [[], Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.editForm.controls; }


  onSubmit() {
    console.log(this.f.courses)
    let that = this;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    };
    let data = {
      "data" : {
          "type": "student--student",
          "attributes": {
            "name": this.f.last_name.value,
            "field_fist_name": this.f.first_name.value,
            "field_courses": this.f.courses.value,
          }
          }
  
      }
    



    const myFormData = this.getFormData(data);

    Axios.post('http://localhost:8088/jsonapi/student/student', data, { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token') }` }})
      .then(function (response) {
        console.log(response)
        that.router.navigateByUrl('/students')
      })

      .catch(function (error) {
        console.log('this is the error', error)
      });
  }

  getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
  }

  getCourses(){
    let that = this
    Axios.get('http://localhost:8088/jsonapi/course/course')
      .then(function (response) {
        that.courses = response.data;
        console.log(that.courses)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
  















