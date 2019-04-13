import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { FacultyFunService } from './faculty-fun.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {
  fProfileForm: FormGroup;
  fSubject: FormGroup;
  constructor(private fb: FormBuilder, private service: FacultyFunService, public cdr: ChangeDetectorRef) { }

  currentFileUpload: File;
  selectedFiles: FileList;
  hodActivity: boolean;
  facultyList: [];
  Sems: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
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
    designation: ''
  };
  hod: boolean;

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  uploadNotes() {
    if (this.fProfileForm.valid) {
      this.currentFileUpload = this.selectedFiles.item(0);
      let mappedObject = this.mapValue(this.fProfileForm);
      this.service
        .uploadAssignment(this.currentFileUpload, mappedObject)
        .subscribe(data => {
          if (data.error) {
            alert('upload failed');
          } else {
            alert('upload success');
          }
        });
    } else {
      alert('Add error window here');
    }
  }

  assignSubjectFaculty() {
    if (this.fSubject.valid) {
      this.service.assignFacultySubject(this.mapSub(this.fSubject)).subscribe(response => {
        if (response.error) {
          alert('failed');
        } else {
          alert('success');
        }
      });
    } else {
      alert('invalid data');
    }
  }
  ngOnInit() {
    this.hodActivity = true;
    let that = this;
    this.service.getFacEmail().subscribe(data => {
      that.facInfo = data;
      if (that.facInfo.designation === 'HOD') {
        this.hod = false;
      } else {
        this.hod = true;
      }
      this.cdr.detectChanges();
    });

    this.fProfileForm = this.fb.group({
      data: ['a', Validators.required],
      branch: ['EEE', Validators.required],
      sem: ['1', Validators.required],
      section: ['a'],
      subject: ['', Validators.required],
      file: []
    });

    this.fSubject = this.fb.group({
      facEmail: ['', Validators.required],
      sem: ['1', Validators.required],
      section: ['a'],
      subject: ['', Validators.required]
    });
  }
  mapValue(mappObject: FormGroup) {
    let notesObject = {
      branch: mappObject.controls['branch'].value,
      sem: mappObject.controls['sem'].value,
      subject: mappObject.controls['subject'].value,
      section: mappObject.controls['section'].value,
      data: mappObject.controls['data'].value
    };
    return notesObject;
  }

  mapSub(mappObject: FormGroup) {
    let notesObject = {
      facEmail: mappObject.controls['facEmail'].value,
      sem: mappObject.controls['sem'].value,
      subject: mappObject.controls['subject'].value,
      section: mappObject.controls['section'].value,
      branch: this.fProfileForm.controls['branch'].value
    };
    return notesObject;
  }

  assignSubject() {

    this.service.getFacList(this.facInfo.branch).subscribe(fac => {
      if (fac != null) {
        this.facultyList = fac;
      }
    });
    this.hodActivity = false;
  }

  assignNotes() {
    this.hodActivity = true;
  }
}