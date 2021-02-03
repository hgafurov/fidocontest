import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthHelloComponent } from './auth/auth-hello/auth-hello.component';
import { SiteLayoutComponent } from './layouts/site-layout/site-layout.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { UserEditComponent } from './site/user-edit/user-edit.component';
import { DocListComponent } from './site/doc-list/doc-list.component';
import { DocEditComponent } from './site/doc-edit/doc-edit.component';
import { DocDelDialogComponent } from './site/doc-del-dialog/doc-del-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthHelloComponent,
    LoginComponent,
    RegisterComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    LoginComponent,
    UserEditComponent,
    DocListComponent,
    DocEditComponent,
    DocDelDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppMaterialModule,
    MaterialFileInputModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
