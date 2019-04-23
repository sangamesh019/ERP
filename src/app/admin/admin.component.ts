import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';
import { FacultyFunService } from '../faculty/faculty-fun.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  listOfStudents: Object;
  listOffaculty: Object;
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
  showListOfStudents: boolean;
  showListOfFaculty: boolean;
  constructor(public adminService: AdminService, public service: FacultyFunService) { }

  ngOnInit() {
    this.showListOfStudents = false;
    this.showListOfFaculty = false;
    let that = this;
    this.service.getFacEmail().subscribe(data => {
      that.facInfo = data;
      // this.cdr.detectChanges();
    });
  }

  enableUsers(){
    this.adminService.listAllFaculty().subscribe(faculties => {
      if(faculties!== null){
      this.listOffaculty = faculties;
      this.showListOfFaculty = true;
      } else {
        alert('no facultes');
      }
    });
    this.adminService.listAllStudents().subscribe(students => {
      if(students!== null){
      this.listOfStudents = students;
      this.showListOfStudents = true;
      } else {
        alert('no facultes');
      }
    });
  }

  uploadEvent(){
    
  }
}
