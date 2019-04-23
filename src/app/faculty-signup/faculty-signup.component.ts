import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FacultyFunService } from '../faculty/faculty-fun.service';

@Component({
  selector: 'app-faculty-signup',
  templateUrl: './faculty-signup.component.html',
  styleUrls: ['./faculty-signup.component.css']
})
export class FacultySignupComponent implements OnInit {

  profileForm: FormGroup;
  @ViewChild("stdphoto") stdphoto;
  currentFileUpload: File;
  selectedFiles: FileList;
  typeOfPage: boolean;
  errors: boolean;
  errorList: string[] = [];
  branchList: string[] = ['EEE', 'EC', 'CS', 'MECH', 'IS'];

  public faculty = {
    fName: '',
    mName: '',
    lName: '',
    gender: '',
    dob: '',
    address: '',
    categaroy: '',
    branch: '',
    adhNumber: '',
    mNumber: '',
    email: '',
    password: '',
    aIncome: '',
    designation: '',
    expYears: ''
  };

  constructor(
    private fb: FormBuilder,
    public service: FacultyFunService,
    public route: Router,
    public cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (localStorage.getItem("id")) {
      this.service.getFacEmail().subscribe(data => {
        this.faculty = data;
        this.cdr.markForCheck();
        this.typeOfPage = true;
        this.profileForm = this.initializeValues(this.faculty, this.fb);
      });
    }
    this.typeOfPage = false;
    this.profileForm = this.initializeValues(this.faculty, this.fb);
  }

  initializeValues(studentvalues, studentBuilder: FormBuilder) {
    return studentBuilder.group({
      firstName: [studentvalues.fName !== '' ? studentvalues.fName : '', Validators.required],
      lastName: [studentvalues.lName !== '' ? studentvalues.lName : '', Validators.required],
      middleName: [studentvalues.mName !== '' ? studentvalues.mName : ''],
      gender: [studentvalues.gender !== '' ? studentvalues.gender : ''],
      dob: [studentvalues.dob !== '' ? studentvalues.dob : '', Validators.required],
      addressP: [studentvalues.address !== '' ? studentvalues.address : '', Validators.required],
      anIncome: [studentvalues.aIncome !== '' ? studentvalues.aIncome : '',
      [Validators.minLength(1),
      Validators.maxLength(12),
      Validators.pattern('[0-9]+')]],
      category: [studentvalues.category !== '' ? studentvalues.category : ''],
      branch: [studentvalues.branch !== '' ? studentvalues.branch : ''],
      adhNumber: [studentvalues.adhNumber !== '' ? studentvalues.adhNumber : '',
      [Validators.minLength(10),
      Validators.maxLength(12),
      Validators.pattern('[0-9]+')]
      ],
      mobileNumber: [studentvalues.mNumber !== '' ? studentvalues.mNumber : '',
      [Validators.minLength(10),
      Validators.maxLength(12),
      Validators.pattern('[0-9]+')]],
      email: [studentvalues.email !== '' ? studentvalues.email : '', Validators.email],
      photo: [''],
      expYears: [studentvalues.expYears !== '' ? studentvalues.expYears : '',
      [Validators.minLength(1),
      Validators.maxLength(2),
      Validators.pattern('[0-9]+')]],
      password: [studentvalues.password !== '' ? studentvalues.password : '', Validators.required],
      designation: [studentvalues.designation !== '' ? studentvalues.designation : '', Validators.required],
    });
  }

  submit() {
    if (this.profileForm.valid) {
      if(this.profileForm.controls['branch'].value != '') {
      this.currentFileUpload = this.selectedFiles.item(0);
      let values = this.mapFacultyDetails(this.profileForm);
      this.service.signUp(values).subscribe(status => {
        if (status.error !== undefined && status.error !== 'OK') {
          this.service
            .signUpFile(this.currentFileUpload, values.email)
            .subscribe(result => {
              alert(result);
              this.route.navigateByUrl("/home");
              localStorage.setItem("who", "faculty");
              localStorage.setItem(
                "email",
                this.profileForm.controls["email"].value
              );
            });
        } else {
          alert('sorry could not do any action')
        }
      });
    } else {
      alert('select branch');
    }
    } else {
      this.errors =true;
      // this.error = "Error"
      Object.keys(this.profileForm.controls).forEach(key => {
        if(this.profileForm.get(key).invalid){
          this.errorList.push(key);
        }
      });
    }
  }

  editFaculty(){
    if (this.profileForm.valid) {
      if(this.profileForm.controls['branch'].value != '') {
      this.currentFileUpload = this.selectedFiles.item(0);
      let values = this.mapFacultyDetails(this.profileForm);
      this.service.editFaculty(values).subscribe(status => {
        if (status.error !== undefined && status.error !== 'OK') {
          this.service
            .signUpFile(this.currentFileUpload, values.email)
            .subscribe(result => {
              alert(result);
              this.route.navigateByUrl("/home");
              localStorage.setItem("who", "faculty");
              localStorage.setItem(
                "email",
                this.profileForm.controls["email"].value
              );
            });
        } else {
          alert('sorry could not do any action')
        }
      });
    } else {
      alert('select branch');
    }
    } else {
      this.errors =true;
      // this.error = "Error"
      Object.keys(this.profileForm.controls).forEach(key => {
        if(this.profileForm.get(key).invalid){
          this.errorList.push(key);
        }
      });
    }
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  mapFacultyDetails(faculty: FormGroup) {

    let facultyDetails = {
      designation: faculty.controls["designation"].value,
      fName: faculty.controls["firstName"].value,
      mName: faculty.controls["middleName"].value,
      lName: faculty.controls["lastName"].value,
      gender: faculty.controls["gender"].value,
      dob: faculty.controls["dob"].value,
      address: faculty.controls["addressP"].value,
      category: faculty.controls["category"].value,
      branch: faculty.controls["branch"].value,
      adhNumber: faculty.controls["adhNumber"].value,
      mNumber: faculty.controls["mobileNumber"].value,
      email: faculty.controls["email"].value,
      password: faculty.controls["password"].value,
      aIncome: faculty.controls["anIncome"].value
    };
    return facultyDetails;
  }
}
