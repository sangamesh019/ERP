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
    designation: ''
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

    // this.profileForm = this.fb.group({
    //   firstName: ['', Validators.required],
    //   lastName: ['', Validators.required],
    //   middleName: [''],
    //   gender: [''],
    //   dob: ['', Validators.required],
    //   addressP: ['', Validators.required],
    //   anIncome: [''],
    //   category: [''],
    //   branch: [''],
    //   adhNumber: [''],
    //   mobileNumber: [''],
    //   email: ['', Validators.email],
    //   photo: [''],
    //   designation: ['', Validators.required],
    //   password: ['', Validators.required]
    // });
  }

  initializeValues(studentvalues, studentBuilder: FormBuilder) {
    return studentBuilder.group({
      firstName: [studentvalues.fName !== ''? studentvalues.fName: '', Validators.required],
      lastName: [studentvalues.lName !== ''? studentvalues.lName: '', Validators.required],
      middleName: [studentvalues.mName !== ''? studentvalues.mName: ''],
      gender: [studentvalues.gender !== ''? studentvalues.gender: ''],
      dob: [studentvalues.dob !== ''? studentvalues.dob: '', Validators.required],
      addressP: [studentvalues.address !== ''? studentvalues.address: '', Validators.required],
      anIncome: [studentvalues.aIncome !== ''? studentvalues.aIncome: ''],
      category: [studentvalues.categaroy !== ''? studentvalues.categaroy: ''],
      branch: [studentvalues.branch !== ''? studentvalues.branch: ''],
      adhNumber: [studentvalues.adhNumber !== ''? studentvalues.adhNumber: ''],
      mobileNumber: [studentvalues.mNumber !== ''? studentvalues.mNumber: ''],
      email: [studentvalues.email !== ''? studentvalues.email: '', Validators.email],
      photo: [''],
      // usn: [studentvalues.usn !== ''? studentvalues.usn: '', Validators.required],
      password: [studentvalues.password !== ''? studentvalues.password: '', Validators.required],
      designation: [studentvalues.designation !== ''? studentvalues.designation: '', Validators.required],
    });
  }

  submit(){
    this.currentFileUpload = this.selectedFiles.item(0);
    if (this.profileForm.valid) {
      let values = this.mapFacultyDetails(this.profileForm);
      this.service.signUp(values).subscribe(status => {
        if (status) {
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
        }
      });
    } else {
      alert('invalid');
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
