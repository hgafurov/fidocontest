import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthHelloComponent } from './auth/auth-hello/auth-hello.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './layouts/site-layout/site-layout.component';
import { HelloComponent } from './site/hello/hello.component';
import { LogoaddComponent } from './site/logoadd/logoadd.component';

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/auth-hello', pathMatch: 'full'},
      {path: 'auth-hello', component: AuthHelloComponent},
      {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
      {path: 'register', component: RegisterComponent}
    ]
  },
  {
    path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
      {path: 'hello', component: HelloComponent},
      {path: 'logoadd', component: LogoaddComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
