import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpCallService } from './services/http-call.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BackOfficeComponent } from './components/back-office/back-office.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EditComponent } from './components/edit/edit.component';
import { CoursesComponent } from './courses/courses.component';
import { LectorsComponent } from './lectors/lectors.component';
import { CreateComponent } from './students/create/create.component';


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
