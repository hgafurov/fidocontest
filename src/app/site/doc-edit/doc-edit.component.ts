import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-doc-edit',
  templateUrl: './doc-edit.component.html',
  styleUrls: ['./doc-edit.component.css']
})
export class DocEditComponent implements OnInit{
  
  docForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DocEditComponent>) {}
 
    
  ngOnInit(): void {
    this.docForm = new FormGroup({
      regNo: new FormControl('34hhd', [Validators.required, regNoValidator]),
      regDate: new FormControl((new Date()).toISOString().slice(0, 10), [Validators.required]),
      outDocNo: new FormControl(null, [Validators.required, regNoValidator]),
      outDocDate: new FormControl(null),
      formaDostav: new FormControl(null),
      correspondent: new FormControl(null, [Validators.required]),
      tema: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      description: new FormControl(null, [Validators.maxLength(1000)]),
      srokIspol: new FormControl(null),
      access: new FormControl(null, Validators.required),
      control: new FormControl(null, Validators.required),
      docUrl: new FormControl(null, Validators.required)
    },
    { validators: verificationSrokIspol });

  }

  closeDialog(str: string) {
    this.dialogRef.close(str);
  }

  public checkError(controlName: string, errorName: string): boolean {
    return this.docForm.controls[controlName].hasError(errorName);
  }

}

export function regNoValidator(control: AbstractControl): ValidationErrors {
  const value = control.value;
  const hasNumber = /[0-9]/.test(value);
  console.log(hasNumber);
  if (!hasNumber) {
    return {regNoValidator: 'В поле должен присутствовать цифры'}
  }
  return null;
}

export const verificationSrokIspol: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const date1 = control.get('regDate');
  const date2 = control.get('srokIspol');
  
  if (date1.errors && !date2.errors.verificationSrokIspol) {
    return;
  }
  if (date1.value > date2.value) {
    date2.setErrors({ verificationSrokIspol: true});
  } else {
    date2.setErrors(null);
  }
}