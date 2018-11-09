import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from './components/login/login.component';
import { BackOfficeComponent } from './components/back-office/back-office.component';
import { EditComponent } from './components/edit/edit.component';
import { CoursesComponent } from './components/courses/show/courses.component';
import { LectorsComponent } from './components/lectors/show/lectors.component';
import { CreateComponent as StudentCreateComponent }  from "./components/students/create/create.component";
import { CreateComponent as coursesCreate } from './components/courses/create/create.component';
import { CreateComponent as lectorCreate } from './components/lectors/create/create.component';

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
  {
    path: 'course/create',
    component: coursesCreate,
  },
  {
    path: 'lector/create',
    component: lectorCreate,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
