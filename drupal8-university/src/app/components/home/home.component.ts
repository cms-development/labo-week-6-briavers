import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { HttpCallService } from 'src/app/services/http-call.service';
import { HttpHeaders } from '@angular/common/http';
import Axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public students;

  private httpCall: HttpCallService;
  constructor() { }

  ngOnInit() {
    this.getStudents();

  }

  getStudents() {
    let that = this
    axios.get('http://localhost:8088/jsonapi/student/student?include=field_courses')
      .then(function (response) {
        that.students = response.data;
        console.log(that.students)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getCoure(course) {
    let returnValue = '';
    this.students.included.forEach(element => {

      if (element.id == course) {

        returnValue = element.attributes.name;

      }
    });
    return (returnValue);
  }

  toReadableTime(time) {
    var myDate = new Date(time * 1000);
    return (myDate.toUTCString());
  }

  delete(id) {
    const token = localStorage.getItem("token")
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };


    Axios.delete(`http://localhost:8088/jsonapi/student/student/${id}`, { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
      .then(function (response) {
        console.log(response)
        location.reload(); 
      })

      .catch(function (error) {
        console.log('this is the error', error)
      });
  }



}



