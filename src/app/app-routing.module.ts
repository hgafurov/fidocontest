import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthHelloComponent } from './auth/auth-hello/auth-hello.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './layouts/site-layout/site-layout.component';
import { DocEditComponent } from './site/doc-edit/doc-edit.component';
import { DocListComponent } from './site/doc-list/doc-list.component';
import { UserEditComponent } from './site/user-edit/user-edit.component';

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/auth-hello', pathMatch: 'full'},
      {path: 'auth-hello', component: AuthHelloComponent},
      {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
      {path: 'register', component: RegisterComponent, canActivate: [LoginGuard]}
    ]
  },
  {
    path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
      {path: 'doc-list', component: DocListComponent},
      {path: 'doc-edit', component: DocEditComponent},
      {path: 'user-edit', component: UserEditComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
