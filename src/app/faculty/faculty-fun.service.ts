import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FacultyFunService {

  constructor(public http: HttpClient) {

  }
  public httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    })
  };

  uploadAssignment(file: File, mappedObject): Observable<any> {
    let fomrData = new FormData();
    fomrData.append('file', file);
    fomrData.append('branch', mappedObject.branch);
    fomrData.append('sem', mappedObject.sem);
    fomrData.append('subject', mappedObject.subject);
    fomrData.append('section', mappedObject.section);
    fomrData.append('type', mappedObject.data);

    return this.http.post("http://localhost:8080/college/uploadAssignment", fomrData);
  }
  signUp(faculty): Observable<any> {
    return this.http.post("http://localhost:8080/college/signUpFaculty", faculty);
  }
  editFaculty(faculty): Observable<any> {
    return this.http.post("http://localhost:8080/college/editFaculty", faculty);
  }

  uploadEvent(event): Observable<any> {
    return this.http.post("http://localhost:8080/college/uploadEvents", event);
  }

  signUpFile(photo: File, email: string): Observable<any> {
    let fomrData = new FormData();
    fomrData.append('file', photo);
    fomrData.append('email', email);

    return this.http.post("http://localhost:8080/college/signUpFacultyPhoto", fomrData);
  }

  getFacEmail(): Observable<any> {
    let email = localStorage.getItem('id');
    return this.http.get("http://localhost:8080/college/faculty/" + email);
  }

  getFacEditEmail(): Observable<any> {
    let email = localStorage.getItem('id');
    return this.http.get("http://localhost:8080/college/facultyEdit/" + email);
  }
  geAllEvents(): Observable<any> {
    return this.http.get("http://localhost:8080/college/getAllEvents/");
  }

  getFacList(branch): Observable<any> {
    return this.http.get("http://localhost:8080/college/facultList/" + branch);
  }

  assignFacultySubject(assignFacultySubject): Observable<any> {
    return this.http.post("http://localhost:8080/college/assignFacultySubject", assignFacultySubject);
  }

  getSubjectAssignedToFaculty(branch, email): Observable<any> {
    return this.http.get("http://localhost:8080/college/getSubjectAssigned/" + branch + "/" + email);
  }

  getStudentByBranch(branch): Observable<any> {
    return this.http.get("http://localhost:8080/college/studentBranch/" + branch);
  }

  uploadResults(result) {
    return this.http.post("http://localhost:8080/college/uploadResults", result);
  }
  updateProfile(profile) {
    return this.http.post("http://localhost:8080/college/editFaculty", profile);
  }
}
