import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  lSub: Subscription; // bu http stream uchun

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    
    this.loginForm = new FormGroup({
      login: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)])
    });

    this.route.queryParams.subscribe(params => {
      if (params['registered']) {
        // Ro'yhatdan o'tgan bo'lsa
      } else if (params['accessDenied']) {
        // Ro'yhatdan o'tish lozim
      }
    })
  }  

  ngOnDestroy(): void {
    if (this.lSub != null) { // agar http stream bo'lsa uni yo'qotamiz
      this.lSub.unsubscribe();
    }
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  login() {
    this.loginForm.disable();
    this.lSub = this.authService.login(this.loginForm.value).subscribe(
      () => this.router.navigate(['/overview']),
      error => {
        console.warn(error);
        this.loginForm.enable();
      }
    )      
  }

}
