import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {

  userForm: FormGroup;
  rSub: Subscription;
  uSub: Subscription;
  
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

    this.userForm = new FormGroup({
      login: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      familiya: new FormControl(null, [Validators.required]),
      imya: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.email]),  
    }) 

    this.updateCurrentUserData();
  }

  updateCurrentUserData() {
    this.uSub = this.authService.getCurrentUser().subscribe(
      (user) => {
        this.userForm.controls["login"].setValue(user.login);
        this.userForm.controls["familiya"].setValue(user.familiya);
        this.userForm.controls["imya"].setValue(user.imya);
        this.userForm.controls["email"].setValue(user.email);
      }
    )
  }

  checkError(controlName: string, errorName: string): boolean {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  saveUser() {
    this.userForm.disable();
    this.rSub = this.authService.updateUser(this.userForm.value).subscribe(
      (user) => {
        this.userForm.controls["login"].setValue(user.login);
        this.userForm.controls["familiya"].setValue(user.familiya);
        this.userForm.controls["imya"].setValue(user.imya);
        this.userForm.controls["email"].setValue(user.email);
        this.userForm.enable();
      },
      error => {
        console.warn(error);
        this.userForm.enable();
      }      
    );
  }

  cancel() {
    this.router.navigate(['/doc-list'])
  }
}