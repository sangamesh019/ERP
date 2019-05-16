import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';
import { FacultyFunService } from '../faculty/faculty-fun.service';
import { Router } from '@angular/router';

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
  enableOrDisable: Array<any> = [];
  constructor(public adminService: AdminService, public service: FacultyFunService, public route: Router) { }

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

  selected(val){
    if(val.target.checked){
      this.enableOrDisable.push(val.target.defaultValue)
    } else {
      // this.enableOrDisable.filter(val => val != {'usn':val.target.defaultValue});
      this.enableOrDisable.splice(this.enableOrDisable.indexOf(val.target.defaultValue), 1);
    }
  }

  disableSelctedStu(type){
    if(this.enableOrDisable.length != 0){
      this.adminService.disableUser(this.enableOrDisable, type).subscribe(result =>{
        // alert(result);
        this.enableUsers();
      });
    } else {
      alert('no students selected');
    }
  }
  uploadEvent(){
    
  }
}
