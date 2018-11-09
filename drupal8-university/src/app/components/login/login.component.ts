import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpCallService } from 'src/app/services/http-call.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication-service.service';
import { first } from 'rxjs/operators';
import Axios, { AxiosResponse } from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  Token;
  Auth;
  error;

  constructor(
    private httpCall: HttpCallService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: HttpCallService,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
   public responseN = {
     access_token : '',
     refresh_token : ''

  }
    
    onSubmit() {
      
   
    let that = this;
    let data = {
      "grant_type": 'password',
      "client_id": 'dca795dc-cfdf-4f3b-8d8e-98dfe2ceebbd',
      "client_secret": 'secret',
      "username": this.f.username.value,
      'password': this.f.password.value
    }
    const myFormData = this.getFormData(data);

      Axios.post('http://localhost:8088/oauth/token',myFormData)
        .then(function (response) {
          try{

             localStorage.setItem("token", response.data.access_token)
             localStorage.setItem("refresh_token", response.data.refresh_token)
             that.router.navigateByUrl('/backOffice')
           } catch(error){
              console.log(error)
           }
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



}
