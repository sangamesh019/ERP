import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { FacultyFunService } from "./faculty-fun.service";

@Component({
  selector: "app-faculty",
  templateUrl: "./faculty.component.html",
  styleUrls: ["./faculty.component.css"]
})
export class FacultyComponent implements OnInit {
  fProfileForm: FormGroup;
  constructor(private fb: FormBuilder, private service: FacultyFunService, public cdr: ChangeDetectorRef) {}

  currentFileUpload: File;
  selectedFiles: FileList;
  facInfo: object;

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
          } else {
          }
        });
    } else {
      alert("Add error window here");
    }
  }
  ngOnInit() {
    let that = this;
    this.service.getFacEmail().subscribe(data => {
      that.facInfo = data;
      this.cdr.detectChanges();
    });

    this.fProfileForm = this.fb.group({
      branch: ["", Validators.required],
      sem: ["", Validators.required],
      section: [""],
      subject: [""],
      file: []
    });
  }
  mapValue(mappObject: FormGroup) {
    let notesObject = {
      branch: mappObject.controls["branch"].value,
      sem: mappObject.controls["sem"].value,
      subject: mappObject.controls["subject"].value,
      section: mappObject.controls["section"].value
      // 'document': mappObject.controls['file'].value
    };
    return notesObject;
  }

  uploadAssignment() {}
}
