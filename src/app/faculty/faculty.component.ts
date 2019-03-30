import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FacultyFunService } from './faculty-fun.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {

  fProfileForm: FormGroup;
  constructor(private fb: FormBuilder, private service: FacultyFunService) { }

  currentFileUpload: File;
  selectedFiles: FileList;
  
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  uploadNotes(that){
    
    if(this.fProfileForm.valid){
      this.currentFileUpload = this.selectedFiles.item(0);
      let mappedObject = this.mapValue(this.fProfileForm);
      this.service.uploadAssignmentDetails(mappedObject).subscribe(dataUpload =>{
        if(dataUpload.error){

        }else {
        this.service.uploadAssignment(this.currentFileUpload).subscribe(data => {
          if(data.error){
  
          }else {
  
          }
        });}
      })
      
    }else {
      alert("Add error window here");
    }
  }
  ngOnInit() {
    this.fProfileForm = this.fb.group({
      branch: ['',  Validators.required],
      sem: ['',  Validators.required],
      section: [''],
      subject: [''],
      file: []
    });
  }
  mapValue(mappObject: FormGroup){
    let notesObject = {
      'branch': mappObject.controls['branch'].value,
      'sem': mappObject.controls['sem'].value,
      'subject': mappObject.controls['subject'].value,
      'section': mappObject.controls['section'].value,
      'document': mappObject.controls['file'].value
    }
    return notesObject;
  }

}
