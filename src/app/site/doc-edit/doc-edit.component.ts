import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileInput, FileValidator } from 'ngx-material-file-input';
import { Observable, Subscription } from 'rxjs';
import { IDoc } from 'src/app/interfaces/i.doc';
import { IUpload } from 'src/app/interfaces/i.upload';
import { Doc } from 'src/app/models/doc';
import { AuthService } from 'src/app/services/auth.service';
import { DocService } from 'src/app/services/doc.service';

@Component({
  selector: 'app-doc-edit',
  templateUrl: './doc-edit.component.html',
  styleUrls: ['./doc-edit.component.css']
})
export class DocEditComponent implements OnInit, OnDestroy{
  
  docForm: FormGroup;
  dSub: Subscription;
  dSub2: Subscription;
  doc: IDoc;

  constructor(public dialogRef: MatDialogRef<DocEditComponent>,
              private http: HttpClient,
              private authService: AuthService,
              private docService: DocService,
              @Inject(MAT_DIALOG_DATA) 
              public data: any) {

  }
  
  
  ngOnDestroy(): void {
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
    if (this.dSub2) {
      this.dSub2.unsubscribe();
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
      srokIspol: new FormControl(null, [Validators.required]),
      access: new FormControl(null),
      control: new FormControl(null),
      file: new FormControl(null,[FileValidator.maxContentSize(1048576)]),
      docUrl: new FormControl(null)
    },
    { validators: verificationSrokIspol });
    
    if (this.data.docId != 0 ) {
      this.dSub = this.docService.getDocById(this.data.docId).subscribe(
        doc => {
          this.doc = doc;
          this.docToFormDoc(doc);   
        }
      );
    } else {
      this.doc = new Doc();
      this.dSub = this.authService.getCurrentUser().subscribe(
        user => {
          this.doc.user = user;
          this.docToFormDoc(this.doc);
        }
      );
    }
  }

  closeDialog(str: string) {
    this.dialogRef.close(str);
  }

  public checkError(controlName: string, errorName: string): boolean {
    return this.docForm.controls[controlName].hasError(errorName);
  }

  saveDoc() {
    if (this.docForm.get('file').value) { 
      const fileForm: FileInput = this.docForm.get('file').value;
      const file = fileForm.files[0];
      const uploadForm = new FormData();
      uploadForm.append('file',file);
      this.dSub2 = this.http.post<IUpload>('/api/v1/upload',uploadForm).subscribe(
        res => {
          this.docForm.get('docUrl').setValue(res.url);
          this.docFromFormDoc();
          this.saveDocIn();
        }
      )
    }
  }

  saveDocIn() {

    if (this.data.docId == 0) {
      this.dSub = this.docService.saveDoc(this.doc).subscribe(
        doc => {
          this.doc = doc;
          this.docToFormDoc(doc);
        }
      )
    } else {
      this.dSub = this.docService.updateDoc(this.doc).subscribe(
        doc => {
          this.doc = doc;
          this.docToFormDoc(doc);
        }
      )
    }
  }
  
  docToFormDoc(doc:IDoc) {
    this.docForm.controls['regNo'].setValue(doc.regNo);
    this.docForm.controls['regDate'].setValue(doc.regDate.toString().slice(0,10));
    this.docForm.controls['outDocNo'].setValue(doc.outDocNo);
    this.docForm.controls['outDocDate'].setValue(doc.outDocDate.toString().slice(0,10));
    this.docForm.controls['formaDostav'].setValue(doc.formaDostav);
    this.docForm.controls['correspondent'].setValue(doc.correspondent);
    this.docForm.controls['tema'].setValue(doc.tema);
    this.docForm.controls['description'].setValue(doc.description);
    this.docForm.controls['srokIspol'].setValue(doc.srokIspol.toString().slice(0,10));
    this.docForm.controls['access'].setValue(doc.access);
    this.docForm.controls['control'].setValue(doc.control);
    this.docForm.controls['docUrl'].setValue(doc.docUrl); 
  }

  docFromFormDoc() {
    this.doc.regNo = this.docForm.controls['regNo'].value;
    this.doc.regDate = this.docForm.controls['regDate'].value;
    this.doc.outDocNo = this.docForm.controls['outDocNo'].value;
    this.doc.outDocDate = this.docForm.controls['outDocDate'].value;
    this.doc.formaDostav = this.docForm.controls['formaDostav'].value;
    this.doc.correspondent = this.docForm.controls['correspondent'].value;
    this.doc.tema = this.docForm.controls['tema'].value;
    this.doc.description = this.docForm.controls['description'].value;
    this.doc.srokIspol = this.docForm.controls['srokIspol'].value;
    this.doc.access = this.docForm.controls['access'].value;
    this.doc.control = this.docForm.controls['control'].value;
    this.doc.docUrl = this.docForm.controls['docUrl'].value; 
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