import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpCallService } from './services/http-call.service';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from './components/login/login.component';
import { BackOfficeComponent } from './components/back-office/back-office.component';
import { EditComponent } from './components/edit/edit.component';
import { CoursesComponent } from './components/courses/show/courses.component';
import { LectorsComponent } from './components/lectors/show/lectors.component';
import { CreateComponent as StudentCreateComponent } from "./components/students/create/create.component";
import { CreateComponent as coursesCreate } from './components/courses/create/create.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from './components/lectors/create/create.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    BackOfficeComponent,
    NavbarComponent,
    EditComponent,
    CoursesComponent,
    LectorsComponent,
    StudentCreateComponent,
    coursesCreate,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [HttpCallService],
  bootstrap: [AppComponent]
})
export class AppModule { }
