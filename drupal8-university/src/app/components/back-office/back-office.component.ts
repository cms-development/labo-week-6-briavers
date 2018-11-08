import { Component, OnInit } from '@angular/core';
import { HttpCallService } from 'src/app/services/http-call.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-back-office',
  templateUrl: './back-office.component.html',
  styleUrls: ['./back-office.component.scss']
})
export class BackOfficeComponent implements OnInit {
  public articles

  constructor(
    private httpCall: HttpCallService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: HttpCallService,
  ) { }

  ngOnInit() {

    //check if the person is logged in
    localStorage.getItem('token') ? console.log('yep') : this.router.navigateByUrl('/login')
    this.getRecipes();

  }

  getRecipes() {
    this.httpCall.getArticles().subscribe(
      data => {
        console.log(data)
        this.articles = data;
      },
      err => console.log(err),
      () => console.log('sended the request')
    )
  }

  delete(id){
    console.log(id)
    this.httpCall.deleteArticle(id).subscribe(
      value => {
        console.log(value)
      },
      err => console.log(err),
      () => location.reload()
    )
  }
  edit(id){
    this.router.navigateByUrl(`/edit/${id}`)
  }

}
