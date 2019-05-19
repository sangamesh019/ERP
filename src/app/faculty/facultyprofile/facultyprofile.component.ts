import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { FacultyFunService } from "../faculty-fun.service";

@Component({
  selector: "app-facultyprofile",
  templateUrl: "./facultyprofile.component.html",
  styleUrls: ["./facultyprofile.component.css"]
})
export class FacultyprofileComponent implements OnInit {
  fprofile: FormGroup;
  items: FormArray;
  itemsList: Array<FormGroup> =[];
  facEdit: any;
  aboutMeValue = '';
  constructor(private fb: FormBuilder, private service: FacultyFunService, public cdr: ChangeDetectorRef) { }

  ngOnInit() {
    let that = this;
    this.service.getFacEmail().subscribe(data => {
      that.facInfo = data;
      this.cdr.detectChanges();
      this.fprofile.controls['fName'].setValue(that.facInfo.fName);
      this.fprofile.controls['mName'].setValue(that.facInfo.mName);
      this.fprofile.controls['lName'].setValue(that.facInfo.lName);
      this.fprofile.controls['email'].setValue(that.facInfo.email);
    });
    
    this.service.getFacEditEmail().subscribe(editprofile => {
      if(editprofile !=null || editprofile != undefined){
        that.facEdit = editprofile;
      
      this.cdr.detectChanges();
      this.fprofile.controls['bloodGroup'].setValue(that.facEdit.bloodGroup);
      this.fprofile.controls['mNumber'].setValue(that.facEdit.mNumber);
      this.fprofile.controls['maritalStatus'].setValue(that.facEdit.maritalStatus);
      this.fprofile.controls['aboutMe'].setValue(that.facEdit.aboutMe);
      this.aboutMeValue = this.fprofile.controls['aboutMe'].value;
      this.fprofile.get(['paddress', 'city']).setValue(that.facEdit.paddress.city);
      this.fprofile.get(['paddress', 'country']).setValue(that.facEdit.paddress.country);
      this.fprofile.get(['paddress', 'houseNbr']).setValue(that.facEdit.paddress.houseNbr);
      this.fprofile.get(['paddress', 'locality']).setValue(that.facEdit.paddress.locality);
      this.fprofile.get(['paddress' ,'pincode']).setValue(that.facEdit.paddress.pincode);
      this.fprofile.get(['paddress', 'street']).setValue(that.facEdit.paddress.street);
      this.fprofile.get(['paddress', 'state']).setValue(that.facEdit.paddress.state);
      
      this.fprofile.get(['taddress', 'city']).setValue(that.facEdit.taddress.city);
      this.fprofile.get(['taddress', 'country']).setValue(that.facEdit.taddress.country);
      this.fprofile.get(['taddress', 'houseNbr']).setValue(that.facEdit.taddress.houseNbr);
      this.fprofile.get(['taddress', 'locality']).setValue(that.facEdit.taddress.locality);
      this.fprofile.get(['taddress' ,'pincode']).setValue(that.facEdit.taddress.pincode);
      this.fprofile.get(['taddress', 'street']).setValue(that.facEdit.taddress.street);
      this.fprofile.get(['taddress', 'state']).setValue(that.facEdit.taddress.state);
      
      if(that.facEdit.educationDetails.length > 0){
        that.facEdit.educationDetails.forEach(element => {
          that.addEducation(element);
        });
        
      }
      if(that.items.controls.length > 0){
        let control = <FormArray>that.fprofile.controls.educationDetails;
          control.removeAt(0)
      }
      that.fprofile.controls['educationDetails'].value.push(this.items);
      that.fprofile.controls['licenseNbr'].setValue(that.facEdit.lnbr);
      that.fprofile.controls['pfatherName'].setValue(that.facEdit.pfatherName);
      

      that.fprofile.controls['bloodGroup'].setValue(that.facEdit.bloodGroup);
    } else {
      alert('update values');
    }
    });

    this.fprofile = this.fb.group({
      fName: [''],
      // uName: [],
      mName: [],
      lName: [],
      password: [],
      // ctNbr:[],
      // anIncome: [],
      bloodGroup: [],
      designation: [],
      exWorkshop: [],
      mNumber: [],
      maritalStatus: [],
      email: [],
      licenseNbr: [],
      pfatherName: [],
      aboutMe: [],
      educationDetails: this.fb.array([this.education('')]),
      // empDetails: this.fb.group({
      //   edDesig: [],
      //   edName: [],
      //   edPeriod: []
      // }),
      paddress: this.fb.group({
        city: [],
        country: ['India'],
        houseNbr: [],
        locality: [],
        pincode: [],
        state: [],
        street: []
      }),
      taddress: this.fb.group({
        city: [],
        country: ['India'],
        houseNbr: [],
        locality: [],
        pincode: [],
        state: [],
        street: []
      })
    });
  }

  education(values): FormGroup {
    return this.fb.group({
      eqDegree: [values ==''?'': values.eqDegree],
      eqLevel: [values ==''?'': values.eqLevel],
      eqSpecialization: [values ==''?'': values.eqSpecialization],
      eqUniv: [values ==''?'': values.eqUniv],
      eqYear: [values ==''?'': values.eqYear],
      eqGPA: [values ==''?'': values.eqGPA]
    });
  }

  addEducation(values) {
    this.items = this.fprofile.get('educationDetails') as FormArray;
    if (this.items.length < 5) {
      this.items.push(this.education(values));
    } else {
      alert('not allowed')
    }
  }
  update() {
    alert(this.fprofile.valid);
    // if(this.fprofile.controls['password'].value !== ''){
    let fporfileData = this.mapProfile();
    this.service.updateProfile(fporfileData).subscribe(result =>{
      alert(result);
    });
  // } else {
  //   alert('enter password');
  // }
  }

  mapProfile() {
    let educationList: Array<any> = [];
    this.fprofile.controls['educationDetails'].value.forEach(element => {
     let elist = {
        'eqDegree': element.eqDegree,
        'eqLevel': element.eqLevel,
        'eqSpecialization': element.eqSpecialization,
        'eqUniv': element.eqUniv,
        'eqYear': element.eqYear,
        'eqGPA': element.eqGPA
      }
      educationList.push(elist)
    });
    return {
      'fName': this.fprofile.controls['fName'].value,
      'mName': this.fprofile.controls['mName'].value,
      'lName': this.fprofile.controls['lName'].value,
      'mNumber': this.fprofile.controls['mNumber'].value,
      'bloodGroup': this.fprofile.controls['bloodGroup'].value,
      'maritalStatus': this.fprofile.controls['maritalStatus'].value,
      'lnbr': this.fprofile.controls['licenseNbr'].value,
      'designation': this.facInfo.designation,
      'email': this.facInfo.email,
      'paddress': {
        'houseNbr': this.fprofile.controls['paddress'].value.houseNbr,
        'street' : this.fprofile.controls['paddress'].value.street,
        'locality' : this.fprofile.controls['paddress'].value.locality,
        'city' : this.fprofile.controls['paddress'].value.city,
        'state' : this.fprofile.controls['paddress'].value.state,
        'country' : this.fprofile.controls['paddress'].value.country,
        'pincode' : this.fprofile.controls['paddress'].value.pincode
      },
      'taddress': {
        'houseNbr': this.fprofile.controls['taddress'].value.houseNbr,
        'street' : this.fprofile.controls['taddress'].value.street,
        'locality' : this.fprofile.controls['taddress'].value.locality,
        'city' : this.fprofile.controls['taddress'].value.city,
        'state' : this.fprofile.controls['taddress'].value.state,
        'country' : this.fprofile.controls['taddress'].value.country,
        'pincode' : this.fprofile.controls['taddress'].value.pincode
      },
      'educationDetails':educationList,
      'password': this.fprofile.controls['password'].value,
      'pfatherName': this.fprofile.controls['pfatherName'].value,
      'aboutMe': this.fprofile.controls['aboutMe'].value
    }
    
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
