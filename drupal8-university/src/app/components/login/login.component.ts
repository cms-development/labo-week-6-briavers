import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpCallService } from 'src/app/services/http-call.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication-service.service';
import { first } from 'rxjs/operators';

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

    onSubmit() {
      this.httpCall.login(this.f.username.value, this.f.password.value).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)

      );
    }

    handleResponse(data){
      console.log(data)
      localStorage.setItem("token" , data.access_token)
      localStorage.setItem("refresh_token", data.refresh_token)
      this.router.navigateByUrl('/backOffice')
    }


    handleError(error) {
      console.log('this is the error', error.error)
      this.error = error.error.error;
    }



}
