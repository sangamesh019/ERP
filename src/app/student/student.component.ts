import { Component, OnInit } from '@angular/core';
import { StudentServieService } from './student-servie.service'
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  public studentInfo: [];
  public assignmentList: [];
  public profileForm: FormGroup;
  constructor(public service: StudentServieService) { }

  ngOnInit() {
    this.service.getStudentByEmail().subscribe(data => {
      this.studentInfo = data;
    });

  }
  getAssignment() {
    this.service.getAssignmentList().subscribe(assignment => {
        this.assignmentList = assignment;
    });

//     var bytes = this.assignmentList;
// var uints = new UInt8Array(bytes);
// var base64 = btoa(String.fromCharCode(null, uints));
// var url = 'data:image/jpeg;base64,' + base64;
  }
}
