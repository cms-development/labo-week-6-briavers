import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

  private baseUrl = 'http://localhost:8080/jsonapi'
  constructor(private http: HttpClient) { }

  login(username, password){
    return this.http.get(`${this.baseUrl}/node/article?include=field_image`)
  }
  getArticles() {
    return this.http.get(`${this.baseUrl}/node/article?include=field_image`)
  }
  getArticle(id) {
    return this.http.get(`${this.baseUrl}/node/article/${id}/?include=field_image`)
  }
}
