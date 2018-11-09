import { Component, OnInit } from '@angular/core';
import Axios from 'axios';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-lectors',
  templateUrl: './lectors.component.html',
  styleUrls: ['./lectors.component.scss']
})
export class LectorsComponent implements OnInit {

  public lectors;

  constructor() { }

  ngOnInit() {
    this.getlectors();

  }

  getlectors() {
    let that = this
    Axios.get('http://localhost:8088/jsonapi/instructor/instructor?include=field_courses')
      .then(function (response) {
        that.lectors = response.data;
        console.log(that.lectors)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getCoure(course) {
    let returnValue = '';
    this.lectors.included.forEach(element => {

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

    Axios.delete(`http://localhost:8088/jsonapi/instructor/instructor/${id}`, { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
      .then(function (response) {
  console.log(response)
        location.reload(); 
})

  .catch(function (error) {
    console.log('this is the error', error)
  });
  }

}



