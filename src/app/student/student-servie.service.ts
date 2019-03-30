import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentServieService {

  constructor(public http: HttpClient) { 

  }
  public  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
  
   getStudentByEmail(): Observable<any> { 
    return this.http.get("http://localhost:8080/college/student/sam1@test.com", this.httpOptions);
  }

  getStudentlist(): Observable<any> { 
    return this.http.get("http://localhost:8080/college/students", this.httpOptions);
  }

  signUp(student): Observable<any> { 
    return this.http.post("http://localhost:8080/college/signUpStudent", student, this.httpOptions);
  }
  signUpFile(photo: File, phNumber: string): Observable<any> { 
    let fomrData = new FormData();
    fomrData.append('file', photo);
    fomrData.append('number', phNumber);

    return this.http.post("http://localhost:8080/college/signUpStudentPhoto",fomrData);
  }

  getAssignmentList(): Observable<any> { 
    return this.http.get("http://localhost:8080/college/listAllAssignments", this.httpOptions);
  }

  getStuList(): Observable<any> { 
    return this.http.get("http://localhost:8080/college/students", this.httpOptions);
  }

  downloadAssignment(filenName): Observable<any> { 
    return this.http.get("http://localhost:8080/college/downloadAssignment/"+filenName);
  }
  
}
