import { Component, OnInit, ViewChild, AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { StudentServieService } from "../student/student-servie.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-student-signup",
  templateUrl: "./student-signup.component.html",
  styleUrls: ["./student-signup.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentSignupComponent implements OnInit {
  profileForm: FormGroup;
  @ViewChild("stdphoto") stdphoto;
  currentFileUpload: File;
  selectedFiles: FileList;
  typeOfPage: boolean;

  public student = {
    fName: '',
    mName: '',
    lName: '',
    gender: '',
    dob: '',
    cAddress: '',
    pAddress: '',
    categaroy: '',
    branch: '',
    sem: '',
    adhNumber: '',
    mNumber: '',
    email: '',
    usn: '',
    password: '',
    parentsDetails: {
      fatherName: '',
      fOccupation: '',
      motherName: '',
      mOccupation: '',
      aIncome: ''
    }
  };

  constructor(
    private fb: FormBuilder,
    public service: StudentServieService,
    public route: Router,
    public cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (localStorage.getItem("id")) {
      this.service.getStudentByUsn().subscribe(data => {
        this.student = data;
        this.cdr.markForCheck();
        this.typeOfPage = true;
        this.profileForm = this.initializeValues(this.student, this.fb);
      });
    }
    this.typeOfPage = false;
    // this.cdr.markForCheck();
    this.profileForm = this.initializeValues(this.student, this.fb);
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
          this.service
            .signUpFile(this.currentFileUpload, values.mNumber)
            .subscribe(result => {
              alert(result);
              this.route.navigateByUrl("/home");
              localStorage.setItem("who", "student");
              localStorage.setItem(
                "id",
                this.profileForm.controls["usn"].value
              );
            });
        } else {
        }
      });
    } else {
      alert('invalid')
    }
  }

  

  initializeValues(studentvalues, studentBuilder: FormBuilder) {
    return studentBuilder.group({
      firstName: [studentvalues.fName !== ''? studentvalues.fName: '', Validators.required],
      lastName: [studentvalues.lName !== ''? studentvalues.lName: '', Validators.required],
      middleName: [studentvalues.mName !== ''? studentvalues.mName: ''],
      gender: [studentvalues.gender !== ''? studentvalues.gender: ''],
      dob: [studentvalues.dob !== ''? studentvalues.dob: '', Validators.required],
      addressP: [studentvalues.pAddress !== ''? studentvalues.pAddress: '', Validators.required],
      addressT: [studentvalues.cAddress !== ''? studentvalues.cAddress: ''],
      fatherName: [studentvalues.parentsDetails.fatherName !== ''? studentvalues.parentsDetails.fatherName: '', Validators.required],
      fOccupation: [studentvalues.parentsDetails.fOccupation !== ''? studentvalues.parentsDetails.fOccupation: ''],
      motherName: [studentvalues.parentsDetails.motherName !== ''? studentvalues.parentsDetails.motherName: ''],
      mOccupation: [studentvalues.parentsDetails.mOccupation !== ''? studentvalues.parentsDetails.mOccupation: ''],
      anIncome: [studentvalues.parentsDetails.aIncome !== ''? studentvalues.parentsDetails.aIncome: ''],
      category: [studentvalues.categaroy !== ''? studentvalues.categaroy: ''],
      branch: [studentvalues.branch !== ''? studentvalues.branch: ''],
      sem: [studentvalues.sem !== ''? studentvalues.sem: ''],
      adhNumber: [studentvalues.adhNumber !== ''? studentvalues.adhNumber: ''],
      mobileNumber: [studentvalues.mNumber !== ''? studentvalues.mNumber: ''],
      emailValue: [studentvalues.email !== ''? studentvalues.email: '', Validators.email],
      photo: [''],
      usn: [studentvalues.usn !== ''? studentvalues.usn: '', Validators.required],
      password: [studentvalues.password !== ''? studentvalues.password: '', Validators.required]
    });
  }

  mapStudentDetails(student: FormGroup) {
    
    let studentDetails = {
      fName: student.controls["firstName"].value,
      mName: student.controls["middleName"].value,
      lName: student.controls["lastName"].value,
      gender: student.controls["gender"].value,
      dob: student.controls["dob"].value,
      cAddress: student.controls["addressT"].value,
      pAddress: student.controls["addressP"].value,
      categaroy: student.controls["category"].value,
      branch: student.controls["branch"].value,
      sem: student.controls["sem"].value,
      adhNumber: student.controls["adhNumber"].value,
      mNumber: student.controls["mobileNumber"].value,
      email: student.controls["emailValue"].value,
      usn: student.controls["usn"].value,
      password: student.controls["password"].value,
      parentsDetails: {
        fatherName: student.controls["fatherName"].value,
        fOccuption: student.controls["fOccupation"].value,
        motherName: student.controls["motherName"].value,
        mOccuption: student.controls["mOccupation"].value,
        aIncome: student.controls["anIncome"].value
      }
    };
    return studentDetails;
  }
}
