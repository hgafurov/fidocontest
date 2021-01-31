import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FileValidator } from 'ngx-material-file-input';
import { Observable, Subscription } from 'rxjs';
import { DocService } from 'src/app/services/doc.service';

@Component({
  selector: 'app-doc-edit',
  templateUrl: './doc-edit.component.html',
  styleUrls: ['./doc-edit.component.css']
})
export class DocEditComponent implements OnInit, OnDestroy{
  
  docForm: FormGroup;
  dSub: Subscription;
  
  constructor(public dialogRef: MatDialogRef<DocEditComponent>,
              private activatedRoute: ActivatedRoute,
              private docService: DocService,
              @Inject(MAT_DIALOG_DATA) 
              public data: any) {

  }
  
  
  ngOnDestroy(): void {
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }
 
    
  ngOnInit(): void {

    this.docForm = new FormGroup({
      regNo: new FormControl(null, [Validators.required, regNoValidator]),
      regDate: new FormControl((new Date()).toISOString().slice(0, 10), [Validators.required]),
      outDocNo: new FormControl(null, [Validators.required, regNoValidator]),
      outDocDate: new FormControl(null),
      formaDostav: new FormControl(null),
      correspondent: new FormControl(null, [Validators.required]),
      tema: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      description: new FormControl(null, [Validators.maxLength(1000)]),
      srokIspol: new FormControl(null),
      access: new FormControl(null),
      control: new FormControl(null),
      file: new FormControl(null,[FileValidator.maxContentSize(1048576)]),
      docUrl: new FormControl(null)
    },
    { validators: verificationSrokIspol });
    
    this.dSub = this.docService.getDocById(this.data.docId).subscribe(
      doc => {
        this.docForm.controls['regNo'].setValue(doc.regNo);
        this.docForm.controls['regDate'].setValue(doc.regDate);
        this.docForm.controls['outDocNo'].setValue(doc.outDocNo);
        this.docForm.controls['outDocDate'].setValue(doc.outDocDate);
        this.docForm.controls['formaDostav'].setValue(doc.formaDostav);
        this.docForm.controls['correspondent'].setValue(doc.correspondent);
        this.docForm.controls['tema'].setValue(doc.tema);
        this.docForm.controls['description'].setValue(doc.description);
        this.docForm.controls['srokIspol'].setValue(doc.srokIspol);
        this.docForm.controls['access'].setValue(doc.access);
        this.docForm.controls['control'].setValue(doc.control);
        this.docForm.controls['docUrl'].setValue(doc.docUrl);   
      }
    );
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