import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from './components/login/login.component';
import { BackOfficeComponent } from './components/back-office/back-office.component';
import { EditComponent } from './components/edit/edit.component';
import { CoursesComponent } from './courses/courses.component';
import { LectorsComponent } from './lectors/lectors.component';
import { CreateComponent as StudentCreateComponent }  from "./students/create/create.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'backOffice',
    component: BackOfficeComponent,
  },
  {
    path: 'edit/:id',
    component: EditComponent,
  },
  {
    path: 'courses',
    component: CoursesComponent,
  },
  {
    path: 'lectors',
    component: LectorsComponent,
  },
  {
    path: 'students',
    component: HomeComponent,
  },
  {
    path: 'student/create',
    component: StudentCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
