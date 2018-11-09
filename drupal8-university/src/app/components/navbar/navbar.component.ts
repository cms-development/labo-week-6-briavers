import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCallService } from 'src/app/services/http-call.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public loggedIn: boolean
  public me;
  constructor(
    private router: Router,
    private httpCall: HttpCallService
  ) { }

  ngOnInit() {
    this.loggedIn = localStorage.getItem('token')? true : false
    localStorage.getItem('token') ? console.log('') : this.router.navigateByUrl('/login')
  }
  logout(event: MouseEvent) {
    event.preventDefault();
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login')
  }
}
