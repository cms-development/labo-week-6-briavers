import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpCallService } from 'src/app/services/http-call.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Axios from 'axios';
import { HttpHeaders } from '@angular/common/http';

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
  public students;
  public lectors;
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
    this.getStudents()
    this.getLectors()

    this.editForm = this.formBuilder.group({
      academic_institution: ['', Validators.required],
      name: ['', Validators.required],
      students: [[], Validators.required],
      lector: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.editForm.controls; }


  onSubmit() {
    console.log(this.f.students)
    let that = this;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    };
    let data = {
      "data": {
        "type": "student--student",
        "attributes": {
          "name": this.f.name.value,
          "field_academic_institution": this.f.academic_institution.value,
          "field_students": this.f.students.value,
          "field_instructor" : this.f.lector.value
        }
      }

    }




    const myFormData = this.getFormData(data);

    Axios.post('http://localhost:8088/jsonapi/course/course', data, { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
      .then(function (response) {
        console.log(response)
        that.router.navigateByUrl('/courses')
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

  getStudents() {
    let that = this
    Axios.get('http://localhost:8088/jsonapi/student/student')
      .then(function (response) {
        that.students = response.data;
        console.log(that.students)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getLectors() {
    let that = this
    Axios.get('http://localhost:8088/jsonapi/instructor/instructor')
      .then(function (response) {
        that.lectors = response.data;
        console.log(that.lectors)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
















