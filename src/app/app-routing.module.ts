import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthentificationComponent } from './auth/auth.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TaskComponent } from './tasks/tasks.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'tasks', component: TaskComponent },
  { path: 'auth', component: LoginComponent },
  { path: 'login', component: AuthentificationComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: NotFoundComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
