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
  fresult: FormGroup;
  eventUpload: FormGroup;
  showResult: boolean;
  showEvent: boolean;
  assignSubPage: boolean;
  studentInfo: any;
  constructor(private fb: FormBuilder, private service: FacultyFunService, public cdr: ChangeDetectorRef) { }


  EEE: Array<any> = [
    { 'sub': 'EEE1' }, { "sub": 'EEE2' }, { 'sub': 'EEE3' }, { 'sub': 'EEE4' }, { 'sub': 'EEE5' }];
  EC: Array<any> = [
    { 'sub': 'EC1' }, { "sub:": 'EC2' }, { 'sub': 'EC3' }, { 'sub': 'EC4' }, { 'sub': 'EC5' }];
  IS: Array<any> = [
    { 'sub': 'IS1' }, { "sub:": 'IS2' }, { 'sub': 'IS3' }, { 'sub': 'IS4' }, { 'sub': 'IS5' }];
  subjectDropdown: any[];

  currentFileUpload: File;
  selectedFiles: FileList;
  hodActivity: boolean;
  facultyList: [];
  subjectList: Object;
  uploadNotesPage: boolean;
  assignSubjectPage: boolean;
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
    designation: '',
    photo: ''
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
    this.showResult = false;
    this.showEvent = false;
    this.uploadNotesPage = false;
    this.assignSubjectPage = false;
    this.hodActivity = true;
    this.assignSubPage = false;
    let that = this;
    this.subjectDropdown = null;
    this.service.getFacEmail().subscribe(data => {

      that.facInfo = data;
      this.getSubAssignedToMe();
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

    this.fresult = this.fb.group({
      internals: ['', Validators.required],
      subject: ['', Validators.required],
      Student: ['', Validators.required],
      // studentSem: [],
      internMarks: ['', Validators.required],
      assignMarks: ['', [Validators.pattern('[0-9]+'), Validators.required]]
    });
    this.eventUpload = this.fb.group({
      eventType: ['', Validators.required],
      eventDec: ['', Validators.required]
    })
  }

  getSubAssignedToMe() {
    let that = this;
    this.service.getSubjectAssignedToFaculty(that.facInfo.branch, that.facInfo.fName).subscribe(subjects => {
      if (subjects != null) {
        that.subjectList = subjects;
      } else {
        alert('No subject assigned')
      }
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

    this.showResult = false;
    this.showEvent = false;
    this.uploadNotesPage = false;
    this.assignSubjectPage = true;
    // this.assignSubPage = true;

    this.service.getFacList(this.facInfo.branch).subscribe(fac => {
      if (fac != null) {
        this.facultyList = fac;
      }
    });
    // this.hodActivity = false;

  }

  assignNotes() {
    this.hodActivity = true;
    this.uploadNotesPage = true;
    this.assignSubjectPage = false;
    this.showResult = false;
    this.showEvent = false;
    this.assignSubPage = false;
  }
  uploadResult() {
    let that = this;
    this.service.getStudentByBranch(this.facInfo.branch).subscribe(data => {
      that.studentInfo = data;
    });
    if (that.facInfo.branch === 'EEE') {
      that.subjectDropdown = this.EEE;
    } else
      if (that.facInfo.branch === 'EC') {
        this.subjectDropdown = this.EC;
      } else
        if (that.facInfo.branch === 'IS') {
          this.subjectDropdown = this.IS;
        } else {
          this.subjectDropdown = this.IS;
        }
    this.showResult = true;
    this.showEvent = false;
    this.uploadNotesPage = false;
    this.assignSubjectPage = false;
    this.assignSubPage = false;
  }

  showEventScreen() {
    this.showResult = false;
    this.showEvent = true;
    this.uploadNotesPage = false;
    this.assignSubjectPage = false;
    this.assignSubPage = false;
  }
  uploadEvent() {
    if (this.eventUpload.valid) {
      let event = {
        'eventType': this.eventUpload.controls['eventType'].value,
        'eventDetails': this.eventUpload.controls['eventDec'].value,
        'allowed': false
      }
      this.service.uploadEvent(event).subscribe(re => {
        if (re != null || re != undefined) {
          alert('Event uploaded successfully');
          this.eventUpload.controls['eventType'].setValue('');
          this.eventUpload.controls['eventDec'].setValue('');
        } else {
          alert('failed to upload event');
        }
      });
    } else {
      alert('add all values');
    }
  }

  uploadResultOfStudents() {

    if (this.fresult.valid) {
      if (this.fresult.controls['internals'].value !== 'pleaseSelect') {
        let splitValue = this.fresult.controls['Student'].value;
        let semUsn = splitValue.split('-');
        this.fresult.controls['assignMarks'].value;

        let result = {
          'internals': this.fresult.controls['internals'].value,
          'sem': semUsn[1],
          'sub': this.fresult.controls['subject'].value,
          'usn': semUsn[0],
          'internalMark': this.fresult.controls['internMarks'].value,
          'assignMarks': this.fresult.controls['assignMarks'].value
        }

        this.service.uploadResults(result).subscribe(resp => {
          if (resp !== null || resp != undefined) {
            alert('results uploaded');
          } else {
            alert('failed to upload results');
          }
        });
      } else {
        alert('please enter all values');
      }
    } else {
      alert('please enter all values');
    }
    // uploadResults();
  }
}
