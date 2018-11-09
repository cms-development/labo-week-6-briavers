import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import Axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class HttpCallService {

  private baseUrl = 'http://localhost:8088/jsonapi'
  constructor(private http: HttpClient) { }


  getArticles() {
    return this.http.get(`${this.baseUrl}/node/article?include=field_image`)
  }
  getArticle(id) {
    return this.http.get(`${this.baseUrl}/node/article/${id}/?include=field_image`)
  }





  edit(title, body, token, id) {
    console.log(title)
    console.log(body)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };


    let data = {
      "data": {
        "type": "node--article",
        "id": `${id}`,
          "attributes": {
          "title": `${title}`,
          "body": `${body}`
        }
      }
    }

    return this.http.patch(`http://localhost:8080/jsonapi/node/article/${id}`, data, httpOptions )
    
  }







  getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
  }
  






  deleteArticle(id){
    const token = localStorage.getItem("token")
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };


    console.log('delting', id);
    return this.http.delete(`${this.baseUrl}/node/article/${id}`,httpOptions)
  }

}
