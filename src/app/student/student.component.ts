import { Component, OnInit, AfterViewInit } from '@angular/core';
import { StudentServieService } from './student-servie.service'
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit, AfterViewInit {

 public studentInfo: object;
  public assignmentList: [];
  public stuList: [];
  public profileForm: FormGroup;
  assignmentShow: boolean;
  constructor(public service: StudentServieService) { }

  ngOnInit() {
    let that =this;
    this.assignmentShow = false;
    
    this.service.getStudentByUsn().subscribe(data => {
      that.studentInfo = data;
    });

    
  }
  ngAfterViewInit(){
   
  }

  showAssignment() {
    this.assignmentShow = !this.assignmentShow;
  }
  getAssignment() {
    this.service.getAssignmentList().subscribe(assignment => {
      this.assignmentList = assignment;
    });

  }
  
  listAllStudents(){
    this.service.getStuList().subscribe(stuList => {
      this.stuList = stuList;
    });
  }
}