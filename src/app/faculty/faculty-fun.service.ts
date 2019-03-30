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

    return this.http.post("http://localhost:8080/college/uploadAssignment", fomrData);
  }
}
