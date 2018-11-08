import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public students;

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
}



