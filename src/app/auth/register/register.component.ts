import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/interfaces/i.user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  rSub: Subscription;
  
  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) { 

  }

  ngOnDestroy(): void {
    if (this.rSub) {
      this.rSub.unsubscribe();    
    }
   }

  ngOnInit(): void {
    
    this.registerForm = new FormGroup({
      login: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      familiya: new FormControl(null, [Validators.required]),
      imya: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.email]),
      password1: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      password2: new FormControl(null, [Validators.required, Validators.minLength(4)])     
    },
    { validators: identityPasswordError });
  }

  public checkError(controlName: string, errorName: string): boolean {
    return this.registerForm.controls[controlName].hasError(errorName);
  }
  
  register() {
    this.registerForm.disable();
    this.rSub = this.authService.register(this.registerForm.value).subscribe(
      () => {
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }   
        });
      },
      error => {
        console.warn(error);
        this.registerForm.enable();
      }
      
    )
  }
}

export const identityPasswordError: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const pass1 = control.get('password1');
  const pass2 = control.get('password2');

  if (pass1.errors && !pass2.errors.identityPassword) {
    return;
  }

  if (pass1.value !== pass2.value) {
    pass2.setErrors({ identityPasswordError: true});
  } else {
    pass2.setErrors(null);
  }
};
