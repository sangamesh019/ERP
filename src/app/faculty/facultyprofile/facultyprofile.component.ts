import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FacultyFunService } from "../faculty-fun.service";

@Component({
  selector: "app-facultyprofile",
  templateUrl: "./facultyprofile.component.html",
  styleUrls: ["./facultyprofile.component.css"]
})
export class FacultyprofileComponent implements OnInit {
  fprofile: FormGroup;
  constructor(private fb: FormBuilder, private service: FacultyFunService, public cdr: ChangeDetectorRef) {}

  ngOnInit() {
    let that = this;
    this.service.getFacEmail().subscribe(data => {
      that.facInfo = data;
      this.cdr.detectChanges();
    });

    this.fprofile = this.fb.group({
      fName: [],
      uName: [],
      mName: [],
      lName: [],
      ctNbr:[],
      anIncome: [],
      bloodGroup: [],
      designation: [],
      exWorkshop: [],
      mNumber: [],
      maritalStatus: [],
      email: [],
      educationDetailsDiploma: this.fb.group({
        eqDegree: [],
        eqGPA: [],
        eqLevel: [],
        eqName: [],
        eqSpecialization: [],
        eqTime: [],
        eqYear: []
      }),
      empDetails: this.fb.group({
        edDesig: [],
        edName: [],
        edPeriod: []
      }),
      paddress: this.fb.group({
        city: [],
        country: [],
        houseNbr: [],
        locality: [],
        pincode: [],
        state: [],
        street: []
      }),
      taddress: this.fb.group({
        city: [],
        country: [],
        houseNbr: [],
        locality: [],
        pincode: [],
        state: [],
        street: []
      })
    });
  }
  update(){
    alert(this.fprofile.valid);
    alert(this.fprofile.controls['anIncome'].value);
    alert(this.fprofile.controls['bloodGroup'].value);
    alert(this.fprofile.controls['educationDetailsDiploma'].value.eqDegree);
    // alert(edDe.eqDegree);
  }

  public facInfo = {
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
    photo: ''
  };
  public profileValues = {
    anIncome: "",
    bloodGroup: "",
    designation: "",
    educationDetailsDiploma: {
      eqDegree: "",
      eqGPA: "",
      eqLevel: "",
      eqName: "",
      eqSpecialization: "",
      eqTime: "",
      eqYear: "",
    },
    email: "profile@test.cmo",
    empDetails: {
      edDesig: "",
      edName: "",
      edPeriod: "",
    },
    exWorkshop: "",
    mNumber: "",
    maritalStatus: "",
    paddress: {
      city: "",
      country: "",
      houseNbr: "",
      locality: "",
      pincode: "",
      state: "",
      street: "",
    },
    taddress: {
      city: "",
      country: "",
      houseNbr: "",
      locality: "",
      pincode: "",
      state: "",
      street: "",
    },
  }
}
