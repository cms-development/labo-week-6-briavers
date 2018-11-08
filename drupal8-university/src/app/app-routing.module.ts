import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./components/home/home.component";
import { ArticleShowComponent } from "./components/article-show/article-show.component";
import { LoginComponent } from './components/login/login.component';
import { BackOfficeComponent } from './components/back-office/back-office.component';
import { EditComponent } from './components/edit/edit.component';

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
    path: 'article/:id',
    component: ArticleShowComponent,
  },
  {
    path: 'backOffice',
    component: BackOfficeComponent,
  },
  {
    path: 'edit/:id',
    component: EditComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
