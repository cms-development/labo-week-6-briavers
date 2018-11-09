import { Component, OnInit } from '@angular/core';
import Axios from 'axios';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  public courses;

  constructor() { }

  ngOnInit() {
    this.getcourses();

  }

  getcourses() {
    let that = this
    Axios.get('http://localhost:8088/jsonapi/course/course?include=field_students,field_instructor')
      .then(function (response) {
        that.courses = response.data;
        console.log(that.courses)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getStudent(student) {
    let returnValue = '';
    this.courses.included.forEach(element => {

      if (element.id == student) {

        returnValue = element.attributes.name + ' ' + element.attributes.field_fist_name;
        console.log('student')
      }
    });
    return (returnValue);
  }
  getLector(lector) {
   
    let returnValue = '';
    console.log(lector)
    this.courses.included.forEach(element => {

      if (element.id == lector) {

        returnValue = element.attributes.name + ' ' + element.attributes.field_fist_name;

      }
    });
    return (returnValue);
  }

  toReadableTime(time) {
    var myDate = new Date(time * 1000);
    return (myDate.toUTCString());
  }
}



