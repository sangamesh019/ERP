import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { StudentServieService } from '../student/student-servie.service';

@Component({
  selector: 'app-student-signup',
  templateUrl: './student-signup.component.html',
  styleUrls: ['./student-signup.component.css']
})
export class StudentSignupComponent implements OnInit {

  profileForm: FormGroup;
  @ViewChild("stdphoto") stdphoto;
  currentFileUpload: File;
  selectedFiles: FileList;

  constructor(private fb: FormBuilder, public service: StudentServieService) { }

  ngOnInit() {

    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      gender: [''],
      dob: ['', Validators.required],
      addressP: ['', Validators.required],
      addressT: ['',],
      fathersName: ['', Validators.required],
      fOccupation: [''],
      mothersName: [''],
      mOccupation: [''],
      anIncome: [''],
      category: [''],
      branch: [''],
      sem: [''],
      adhNumber: [''],
      mobileNumber: [''],
      emailValue: ['', Validators.email],
      photo: ['']
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  

  submit() {

    this.currentFileUpload = this.selectedFiles.item(0);
    if (this.profileForm.valid) {
      let values = this.mapStudentDetails(this.profileForm);
      this.service.signUp(values).subscribe(status => {
        if (status) {
          this.service.signUpFile(this.currentFileUpload, values.mNumber).subscribe(result => {
            alert(result);
          })
        } else {

        }
      });
    } else {

    }
  }

  mapStudentDetails(student: FormGroup) {
    alert(student.controls['dob'].value);
    let studentDetails = {
      'fName': student.controls['firstName'].value,
      'mName': student.controls['middleName'].value,
      'lName': student.controls['lastName'].value,
      'gender': student.controls['gender'].value,
      'dob': student.controls['dob'].value,
      'cAddress': student.controls['addressT'].value,
      'pAddress': student.controls['addressP'].value,
      'categaroy': student.controls['category'].value,
      'branch': student.controls['branch'].value,
      'sem': student.controls['sem'].value,
      'adhNumber': student.controls['adhNumber'].value,
      'mNumber': student.controls['mobileNumber'].value,
      'email': student.controls['emailValue'].value,
      // 'photo': this.stdphoto.nativeElement.files[0]
    }
    return studentDetails;
  }

}
