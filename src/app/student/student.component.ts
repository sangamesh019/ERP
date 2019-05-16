import { Component, OnInit, AfterViewInit } from '@angular/core';
import { StudentServieService } from './student-servie.service'
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit, AfterViewInit {

  public studentInfo: any;
  public assignmentList: [];
  public stuList: [];
  public profileForm: FormGroup;
  assignmentShow: boolean;
  loader: boolean;
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
  getAssignment(type) {
    this.loader = true;
    this.assignmentList =[];
    this.service.getAssignmentList(this.studentInfo, type).subscribe(assignment => {
      this.assignmentList = assignment;
      this.loader = false;
    });

  }
  
  listAllStudents(){
    this.service.getStuList().subscribe(stuList => {
      this.stuList = stuList;
    });
  }

  result: any;
  showResult: boolean;

  getMyResult(){
    // this.showResult = !this.showResult;
    let that = this;
    this.service.getMyresult(this.studentInfo.usn).subscribe(result => {
      if(result != null || result != undefined){
        that.result = result;
        // alert(that.result.sem);
      } else {
        alert('No results found');
      }
    });
  }
}
